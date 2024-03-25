import {
  IonCol,
  IonGrid,
  IonRow,
  useIonAlert,
  useIonToast,
} from "@ionic/react";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import DOMPurify from "isomorphic-dompurify";

import Auth from "../utils/auth";
import PageComponent from "../components/Page.component";

import {
  QUERY_MY_UNAPPROVED_BLOGS,
  QUERY_MY_APPROVED_BLOGS,
} from "../utils/queries";
import { REMOVE_BLOG } from "../utils/mutations";
import MarkdownEditor from "../components/MarkdownEditor.component";

import "./Account.styles.css";
import { AccountItemComponent } from "../components/AccountItem.component";

const AccountPage = () => {
  const loginStatus = Auth.loggedIn();
  const contentRef = useRef(null);
  const [presentAlert] = useIonAlert();

  useEffect(() => {
    // redirect to login if not logged in
    loginStatus || window.location.assign("/home");
  }, [loginStatus]);

  const [searchTermUnapproved, setSearchTermUnapproved] = useState("");
  const [searchTermApproved, setSearchTermApproved] = useState("");

  const [removeBlog, { error: errorRemove }] = useMutation(REMOVE_BLOG);

  const [present] = useIonToast();

  const presentToast = () => {
    present({
      message: "Blog successfully removed.",
      duration: 1500,
      position: "bottom",
    });
  };

  // query for my unapproved blogs
  const {
    loading: loadingUnapproved,
    error: errorUnapproved,
    data: dataUnapproved,
    fetchMore: fetchMoreUnapproved,
    refetch: refetchUnapproved,
  } = useQuery(QUERY_MY_UNAPPROVED_BLOGS, {
    variables: { offset: 0, limit: 5, searchTerm: searchTermUnapproved },
    fetchPolicy: "cache-and-network",
  });

  // query for my approved blogs
  const {
    loading: loadingApproved,
    error: errorApproved,
    data: dataApproved,
    fetchMore: fetchMoreApproved,
    refetch: refetchApproved,
  } = useQuery(QUERY_MY_APPROVED_BLOGS, {
    variables: { offset: 0, limit: 5, searchTerm: searchTermApproved },
    fetchPolicy: "cache-and-network",
  });

  const [unapprovedBlogs, setUnapprovedBlogs] = useState([]);
  const [approvedBlogs, setApprovedBlogs] = useState([]);

  const [unapprovedBlogsCount, setUnapprovedBlogsCount] = useState(0);
  const [approvedBlogsCount, setApprovedBlogsCount] = useState(0);

  const [shouldIRefetch, setShouldIRefetch] = useState(false);
  const [updateBlog, setUpdateBlog] = useState(null);

  useEffect(() => {
    if (dataUnapproved) {
      setUnapprovedBlogs(dataUnapproved.myUnapprovedBlogs.unapprovedBlogs);
      setUnapprovedBlogsCount(
        dataUnapproved.myUnapprovedBlogs.unapprovedBlogsCount
      );
    }
  }, [dataUnapproved]);

  useEffect(() => {
    if (dataApproved) {
      setApprovedBlogs(dataApproved.myApprovedBlogs.approvedBlogs);
      setApprovedBlogsCount(dataApproved.myApprovedBlogs.approvedBlogsCount);
    }
  }, [dataApproved]);

  const handleLoadMoreUnapproved = async (e) => {
    e.preventDefault(); // prevent page reload on form submit

    try {
      const { data } = await fetchMoreUnapproved({
        variables: {
          offset: unapprovedBlogs.length,
          limit: 5,
          searchTerm: searchTermUnapproved,
        },
      });

      setUnapprovedBlogs([
        ...unapprovedBlogs,
        ...data.myUnapprovedBlogs.unapprovedBlogs,
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLoadMoreApproved = async (e) => {
    e.preventDefault(); // prevent page reload on form submit
    try {
      const { data } = await fetchMoreApproved({
        variables: {
          offset: approvedBlogs.length,
          limit: 5,
          searchTerm: searchTermApproved,
        },
      });

      setApprovedBlogs([
        ...approvedBlogs,
        ...data.myApprovedBlogs.approvedBlogs,
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnapprovedSearch = (e) => {
    e.preventDefault();

    // sanitize input
    const sanitizedInput = DOMPurify.sanitize(e.target.value.trim());

    // set the search term
    setSearchTermUnapproved(sanitizedInput);
  };

  const handleApprovedSearch = (e) => {
    e.preventDefault();

    // sanitize input
    const sanitizedInput = DOMPurify.sanitize(e.target.value.trim());

    // set the search term
    setSearchTermApproved(sanitizedInput);
  };

  const handleRemoveItem =
    (blogId, approved = false) =>
    (e) => {
      e.preventDefault(); // prevent page reload on form submit
      presentAlert({
        header: "Remove Item?",
        subHeader: "Are you sure you want to remove this item?",
        message: "This action cannot be undone.",
        buttons: [
          "Cancel",
          {
            text: "Remove",
            handler: async () => {
              // remove the blog from the list
              try {
                await removeBlog({
                  variables: { _id: blogId },
                }).then(() => {
                  // once the blog is removed, refetch the blogs
                  // if the blog is unapproved, refetch the unapproved blogs
                  if (!approved) {
                    refetchUnapproved();
                  } else {
                    // if the blog is approved, refetch the approved blogs
                    refetchApproved();
                  }
                  return presentToast();
                });
              } catch (err) {
                console.error(err);
                console.error(errorRemove);
              }
            },
          },
        ],
      });
    };

  useEffect(() => {
    if (shouldIRefetch) {
      refetchUnapproved();
      refetchApproved();
      setShouldIRefetch(false);
    }
  }, [refetchApproved, refetchUnapproved, shouldIRefetch]);

  const handleEditItem = (blog) => (e) => {
    e.preventDefault();
    setUpdateBlog(blog);
    contentRef.current.scrollToTop(500, "smooth", "start");
  };

  return (
    <PageComponent contentRef={contentRef}>
      {loginStatus && (
        <div className="home-container">
          <MarkdownEditor
            updateBlog={updateBlog} // If a blog is being updated, pass the blog to the editor
            setUpdateBlog={setUpdateBlog} // Set to null when the blog is submitted for approval
            setShouldIRefetch={setShouldIRefetch} // Set to true when a blog is submitted for approval so that the unapproved blogs are refetched
          />
          <IonGrid>
            <IonRow>
              <IonCol>
                <AccountItemComponent
                  handleSearch={handleUnapprovedSearch}
                  handleLoadMore={handleLoadMoreUnapproved}
                  handleEditItem={handleEditItem}
                  handleRemoveItem={handleRemoveItem}
                  loading={loadingUnapproved}
                  blogs={unapprovedBlogs}
                  error={errorUnapproved}
                  blogsCount={unapprovedBlogsCount}
                />
              </IonCol>
              <IonCol>
                <AccountItemComponent
                  handleSearch={handleApprovedSearch}
                  handleLoadMore={handleLoadMoreApproved}
                  handleEditItem={handleEditItem}
                  handleRemoveItem={handleRemoveItem}
                  loading={loadingApproved}
                  blogs={approvedBlogs}
                  error={errorApproved}
                  blogsCount={approvedBlogsCount}
                  approved={true}
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      )}
    </PageComponent>
  );
};

export default AccountPage;
