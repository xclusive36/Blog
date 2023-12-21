import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
  IonSearchbar,
  IonText,
  useIonAlert,
  useIonToast,
} from "@ionic/react";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import DOMPurify from "isomorphic-dompurify";

import Auth from "../utils/auth";
import PageComponent from "../components/Page.component";
import { closeCircle, createOutline } from "ionicons/icons";

import {
  QUERY_MY_UNAPPROVED_BLOGS,
  QUERY_MY_APPROVED_BLOGS,
} from "../utils/queries";
import { REMOVE_BLOG } from "../utils/mutations";
import MarkdownEditor from "../components/MarkdownEditor.component";

import "./Account.styles.css";

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

  const [isLoadingUnapproved, setIsLoadingUnapproved] = useState(false);
  const [isLoadingApproved, setIsLoadingApproved] = useState(false);

  const [unapprovedBlogs, setUnapprovedBlogs] = useState([]);
  const [approvedBlogs, setApprovedBlogs] = useState([]);

  const [unapprovedBlogsCount, setUnapprovedBlogsCount] = useState(0);
  const [approvedBlogsCount, setApprovedBlogsCount] = useState(0);

  const [shouldIRefetch, setShouldIRefetch] = useState(false);
  const [updateBlog, setUpdateBlog] = useState(null);

  useEffect(() => {
    loadingUnapproved
      ? setIsLoadingUnapproved(true)
      : setIsLoadingUnapproved(false);
  }, [loadingUnapproved]);

  useEffect(() => {
    loadingApproved ? setIsLoadingApproved(true) : setIsLoadingApproved(false);
  }, [loadingApproved]);

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

  const handleLoadMoreApproved = (e) => {
    e.preventDefault();

    try {
      const { data } = fetchMoreApproved({
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
  }, [refetchUnapproved, shouldIRefetch]);

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
              <IonCol sizeXs="12" sizeSm="6">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Blogs waiting approval:</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonSearchbar
                      onIonInput={handleUnapprovedSearch}
                      disabled={unapprovedBlogs.length < 5}
                    />
                    <IonList>
                      <IonListHeader>
                        <IonLabel>
                          <b>Blogs:</b>
                        </IonLabel>
                      </IonListHeader>
                      {isLoadingUnapproved && (
                        <IonItem>
                          <IonLabel className="ion-text-wrap">
                            <div>Loading...</div>
                          </IonLabel>
                        </IonItem>
                      )}
                      {unapprovedBlogs.map((blog) => (
                        <IonItem key={blog._id}>
                          <IonLabel className="ion-text-wrap">
                            <a
                              href={`/blog/${blog.slug}`}
                              className="blog-item-link"
                            >
                              {blog.title}
                            </a>
                            <div className="submitted-on">
                              Submitted: {blog.createdAt}
                            </div>
                          </IonLabel>
                          <IonButton
                            onClick={handleEditItem(blog)}
                            fill="clear"
                            color="dark"
                            slot="end"
                          >
                            <IonIcon slot="icon-only" icon={createOutline} />
                          </IonButton>
                          <IonButton
                            onClick={handleRemoveItem(blog._id)}
                            fill="clear"
                            color="danger"
                            slot="end"
                          >
                            <IonIcon slot="icon-only" icon={closeCircle} />
                          </IonButton>
                        </IonItem>
                      ))}
                      {errorUnapproved && (
                        <IonItem>
                          <IonLabel className="ion-text-wrap">
                            <div className="blog-item-link">
                              Error loading blogs
                            </div>
                            <div>{errorUnapproved.message}</div>
                          </IonLabel>
                        </IonItem>
                      )}
                      {unapprovedBlogs.length === 0 && !errorUnapproved
                        ? !isLoadingUnapproved && (
                            <IonItem>
                              <IonLabel className="ion-text-wrap">
                                <div>No blogs waiting approval</div>
                              </IonLabel>
                            </IonItem>
                          )
                        : unapprovedBlogs.length < unapprovedBlogsCount && (
                            <IonItem lines="none" className="ion-text-center">
                              <IonLabel>
                                <IonButton
                                  onClick={handleLoadMoreUnapproved}
                                  expand="block"
                                  disabled={
                                    unapprovedBlogs.length ===
                                    unapprovedBlogsCount
                                  }
                                >
                                  <IonText className="small">Load More</IonText>
                                </IonButton>
                                <div className="submitted-on">
                                  {unapprovedBlogs.length} of{" "}
                                  {unapprovedBlogsCount}
                                </div>
                              </IonLabel>
                            </IonItem>
                          )}
                    </IonList>
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Active blogs:</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonSearchbar
                      onIonInput={handleApprovedSearch}
                      disabled={approvedBlogs.length < 5}
                    />
                    <IonList>
                      <IonListHeader>
                        <IonLabel>
                          <b>Blogs:</b>
                        </IonLabel>
                      </IonListHeader>
                      {isLoadingApproved && (
                        <IonItem>
                          <IonLabel className="ion-text-wrap">
                            <div>Loading...</div>
                          </IonLabel>
                        </IonItem>
                      )}
                      {approvedBlogs.map((blog) => (
                        <IonItem key={blog._id}>
                          <IonLabel className="ion-text-wrap">
                            <a
                              href={`/blog/${blog._id}`}
                              className="blog-item-link"
                            >
                              {blog.title}
                            </a>
                            <div className="submitted-on">
                              Submitted: {blog.createdAt}
                            </div>
                          </IonLabel>
                          <IonButton
                            onClick={handleEditItem(blog)}
                            fill="clear"
                            color="dark"
                            slot="end"
                          >
                            <IonIcon slot="icon-only" icon={createOutline} />
                          </IonButton>
                          <IonButton
                            onClick={handleRemoveItem(blog._id, true)}
                            fill="clear"
                            color="danger"
                            slot="end"
                          >
                            <IonIcon slot="icon-only" icon={closeCircle} />
                          </IonButton>
                        </IonItem>
                      ))}
                      {errorApproved && (
                        <IonItem>
                          <IonLabel className="ion-text-wrap">
                            <div className="blog-item-link">
                              Error loading blogs
                            </div>
                            <div>{errorApproved.message}</div>
                          </IonLabel>
                        </IonItem>
                      )}
                      {approvedBlogs.length === 0 && !errorApproved
                        ? !isLoadingApproved && (
                            <IonItem>
                              <IonLabel className="ion-text-wrap">
                                <div>No active blogs</div>
                              </IonLabel>
                            </IonItem>
                          )
                        : approvedBlogs.length < approvedBlogsCount && (
                            <IonItem lines="none" className="ion-text-center">
                              <IonLabel>
                                <IonButton
                                  onClick={handleLoadMoreApproved}
                                  disabled={
                                    approvedBlogs.length === approvedBlogsCount
                                  }
                                  expand="block"
                                >
                                  <IonText className="small">Load More</IonText>
                                </IonButton>
                                <div className="submitted-on">
                                  {approvedBlogs.length} of {approvedBlogsCount}
                                </div>
                              </IonLabel>
                            </IonItem>
                          )}
                    </IonList>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      )}
    </PageComponent>
  );
};

export default AccountPage;
