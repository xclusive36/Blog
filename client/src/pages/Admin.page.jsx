import { useEffect, useRef, useState } from "react";
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import PageComponent from "../components/Page.component";
import {
  QUERY_AM_I_ADMIN,
  QUERY_UNAPPROVED_BLOGS,
  QUERY_APPROVED_BLOGS,
} from "../utils/queries";
import {
  ADD_AMINISTRATOR,
  REMOVE_BLOG,
  APPROVE_BLOG,
} from "../utils/mutations";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
  IonToggle,
  useIonAlert,
  useIonToast,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";

const AdminPage = () => {
  const loginStatus = Auth.loggedIn(); // set login status if logged in
  const contentRef = useRef(null);
  const [unapprovedBlogs, setUnapprovedBlogs] = useState([]);
  const [approvedBlogs, setApprovedBlogs] = useState([]);
  const [presentAlert] = useIonAlert();

  useEffect(() => {
    // redirect to login if not logged in
    loginStatus || window.location.assign("/home");
  }, [loginStatus]);

  const { loading, data: dataAdmin } = useQuery(QUERY_AM_I_ADMIN);
  const [removeBlog, { error: errorRemove }] = useMutation(REMOVE_BLOG);
  const [approveBlog, { error: errorApprove }] = useMutation(APPROVE_BLOG);

  // useEffect(() => {
  //   // redirect to home if not admin
  //   if (dataAdmin && !dataAdmin.amIAdmin) {
  //     window.location.assign("/home");
  //   }
  // }, [dataAdmin]);

  const {
    loading: isLoadingUnapproved,
    data: dataUnapproved,
    error: errorUnapproved,
    refetch: refetchUnapproved,
  } = useQuery(QUERY_UNAPPROVED_BLOGS);

  const {
    loading: isLoadingApproved,
    data: dataApproved,
    error: errorApproved,
    refetch: refetchApproved,
  } = useQuery(QUERY_APPROVED_BLOGS);

  const user = Auth.getProfile().data; // Get the user data from the local storage
  console.log(user);

  useEffect(() => {
    if (dataUnapproved) {
      setUnapprovedBlogs(dataUnapproved.unapprovedBlogs);
    }
  }, [dataUnapproved]);

  useEffect(() => {
    if (dataApproved) {
      setApprovedBlogs(dataApproved.approvedBlogs);
    }
  }, [dataApproved]);

  const [addAdmin, { error }] = useMutation(ADD_AMINISTRATOR);

  const [present] = useIonToast();

  const presentToast = (message = "Administrator added successfully!") => {
    present({
      message: message,
      duration: 1500,
      position: "bottom",
    });
  };

  const handleAddAdministrator = async (event) => {
    event.preventDefault();
    const form = event.target;
    const userID = form[0].value;
    try {
      await addAdmin({
        variables: { userID },
      });
      presentToast();
    } catch (err) {
      console.error(err);
    }
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

  const handleBlogActive = async (e, blogId) => {
    e.preventDefault(); // prevent page reload on form submit
    const isActive = e.target.checked;
    try {
      await approveBlog({
        variables: { _id: blogId, approved: isActive },
      }).then(() => {
        // once the blog is approved, refetch the blogs
        refetchUnapproved();
        refetchApproved();
        return presentToast("Status updated!");
      });
    } catch (err) {
      console.error(err);
      console.error(errorApprove);
    }
  };

  return (
    <PageComponent contentRef={contentRef}>
      <div className="admin-container">
        <h1 className="ion-text-center">Admin Page</h1>
        {loading ? (
          <p>Checking Admin Status..</p>
        ) : (
          <>
            <IonGrid>
              <IonRow>
                <IonCol sizeXs="12" sizeSm="6">
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>Blogs waiting approval:</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonList>
                        <IonListHeader>
                          <IonLabel>
                            <b>Blogs:</b>
                          </IonLabel>
                          Active:
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
                              onClick={handleRemoveItem(blog._id)}
                              fill="clear"
                              color="danger"
                              slot="start"
                            >
                              <IonIcon slot="icon-only" icon={closeCircle} />
                            </IonButton>
                            <IonToggle
                              checked={blog.approved}
                              onClick={(e) => handleBlogActive(e, blog._id)}
                              aria-label="activate"
                              slot="end"
                            />
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
                        {unapprovedBlogs.length === 0 &&
                          !errorUnapproved &&
                          !isLoadingUnapproved && (
                            <IonItem>
                              <IonLabel className="ion-text-wrap">
                                <div>No blogs waiting approval</div>
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
                      <IonList>
                        <IonListHeader>
                          <IonLabel>
                            <b>Blogs:</b>
                          </IonLabel>
                          Active:
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
                              onClick={handleRemoveItem(blog._id, true)}
                              fill="clear"
                              color="danger"
                              slot="start"
                            >
                              <IonIcon slot="icon-only" icon={closeCircle} />
                            </IonButton>
                            <IonToggle
                              checked={blog.approved}
                              onClick={(e) => handleBlogActive(e, blog._id)}
                              aria-label="activate"
                              slot="end"
                            />
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
                        {approvedBlogs.length === 0 &&
                          !errorApproved &&
                          !isLoadingApproved && (
                            <IonItem>
                              <IonLabel className="ion-text-wrap">
                                <div>No active blogs</div>
                              </IonLabel>
                            </IonItem>
                          )}
                      </IonList>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonCard>
              <form onSubmit={handleAddAdministrator}>
                <IonCardContent>
                  <IonItem>
                    <IonInput
                      label="Add new Administrator by userID"
                      labelPlacement="stacked"
                      type="text"
                      placeholder="Add userID"
                    />
                  </IonItem>
                  <IonButton
                    className="ion-margin"
                    expand="block"
                    type="submit"
                  >
                    Submit
                  </IonButton>
                  {error && <p className="error-message">{error.message}</p>}
                </IonCardContent>
              </form>
            </IonCard>
          </>
        )}
      </div>
    </PageComponent>
  );
};

export default AdminPage;
