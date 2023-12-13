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
} from "@ionic/react";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import Auth from "../utils/auth";
import PageComponent from "../components/Page.component";
import { squareOutline, checkboxOutline } from "ionicons/icons";

import {
  QUERY_APPROVED_BLOGS,
  QUERY_MY_UNAPPROVED_BLOGS,
  QUERY_AM_I_ADMIN,
} from "../utils/queries";
import MarkdownEditor from "../components/MarkdownEditor.component";

import "./Account.styles.css";

const AccountPage = () => {
  const loginStatus = Auth.loggedIn();
  useEffect(() => {
    // redirect to login if not logged in
    loginStatus || window.location.assign("/home");
  }, [loginStatus]);

  // query for blogs waiting approval
  const {
    loading: loadingUnapproved,
    error: errorUnapproved,
    data: dataUnapproved,
  } = useQuery(QUERY_MY_UNAPPROVED_BLOGS);

  // query for approved blogs
  const {
    loading: loadingApproved,
    error: errorApproved,
    data: dataApproved,
  } = useQuery(QUERY_APPROVED_BLOGS);

  // query for admin status
  const { error: errorAdmin, data: dataAdmin } = useQuery(QUERY_AM_I_ADMIN);

  useEffect(() => {
    if (dataAdmin) {
      console.log(dataAdmin);
    }
  }, [dataAdmin]);

  useEffect(() => {
    if (errorAdmin) {
      console.log(errorAdmin);
    }
  }, [errorAdmin]);

  const [isUnapprovedLoading, setIsUnapprovedLoading] = useState(false);
  const [isApprovedLoading, setIsApprovedLoading] = useState(false);

  const [unapprovedBlogs, setUnapprovedBlogs] = useState([]);
  const [approvedBlogs, setApprovedBlogs] = useState([]);

  useEffect(() => {
    loadingUnapproved
      ? setIsUnapprovedLoading(true)
      : setIsUnapprovedLoading(false);
  }, [loadingUnapproved]);

  useEffect(() => {
    loadingApproved ? setIsApprovedLoading(true) : setIsApprovedLoading(false);
  }, [loadingApproved]);

  useEffect(() => {
    if (dataUnapproved) {
      setUnapprovedBlogs(dataUnapproved.myUnapprovedBlogs);
    }
  }, [dataUnapproved]);

  useEffect(() => {
    if (dataApproved) {
      setApprovedBlogs(dataApproved.approvedBlogs);
    }
  }, [dataApproved]);

  const handleLoadMoreUnapproved = (e) => {
    e.preventDefault();
    console.log("Load more unapproved blogs");
  };

  const handleLoadMoreApproved = (e) => {
    e.preventDefault();
    console.log("Load more approved blogs");
  };

  return (
    <PageComponent>
      {loginStatus && (
        <div className="home-container">
          <MarkdownEditor />
          <IonGrid>
            <IonRow>
              <IonCol sizeXs="12" sizeSm="6">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Blogs waiting approval:</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonSearchbar />
                    <IonList>
                      <IonListHeader>
                        <IonLabel>Name:</IonLabel>
                        <IonText>Approved:</IonText>
                      </IonListHeader>
                      {isUnapprovedLoading && (
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
                              href={`/blog/${blog._id}`}
                              className="blog-item-link"
                            >
                              {blog.title}
                            </a>
                            <div className="submitted-on">
                              Submitted: {blog.createdAt}
                            </div>
                          </IonLabel>
                          <IonText>
                            <IonIcon icon={squareOutline} color="dark" />
                          </IonText>
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
                      {unapprovedBlogs.length === 0 && !errorUnapproved ? (
                        !isUnapprovedLoading && (
                          <IonItem>
                            <IonLabel className="ion-text-wrap">
                              <div>No blogs waiting approval</div>
                            </IonLabel>
                          </IonItem>
                        )
                      ) : (
                        <IonItem lines="none" className="ion-text-center">
                          <IonLabel>
                            <form onSubmit={handleLoadMoreUnapproved}>
                              <IonButton type="submit" expand="block">
                                <IonText className="small">Load More</IonText>
                              </IonButton>
                            </form>
                            <div className="submitted-on">5 of 10</div>
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
                    <IonSearchbar />
                    <IonList>
                      <IonListHeader>
                        <IonLabel>Name:</IonLabel>
                        <IonText>Approved:&nbsp;&nbsp;</IonText>
                      </IonListHeader>
                      {isApprovedLoading && (
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
                          <IonText>
                            <IonIcon icon={checkboxOutline} color="success" />
                          </IonText>
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
                      {approvedBlogs.length === 0 && !errorApproved ? (
                        !isApprovedLoading && (
                          <IonItem>
                            <IonLabel className="ion-text-wrap">
                              <div>No active blogs</div>
                            </IonLabel>
                          </IonItem>
                        )
                      ) : (
                        <IonItem lines="none" className="ion-text-center">
                          <IonLabel>
                            <form onSubmit={handleLoadMoreApproved}>
                              <IonButton type="submit" expand="block">
                                <IonText className="small">Load More</IonText>
                              </IonButton>
                            </form>
                            <div className="submitted-on">5 of 10</div>
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
