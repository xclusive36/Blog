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
import { checkmarkOutline, hourglassOutline } from "ionicons/icons";

import "./Account.styles.css";
import {
  QUERY_APPROVED_BLOGS,
  QUERY_MY_UNAPPROVED_BLOGS,
} from "../utils/queries";

const AccountPage = () => {
  // query for blogs waiting approval
  const {
    loading: loadingUnapproved,
    error: errorUnapproved,
    data: dataUnapproved,
  } = useQuery(QUERY_MY_UNAPPROVED_BLOGS, {
    variables: { userID: Auth.getToken() },
  });

  // query for approved blogs
  const {
    loading: loadingApproved,
    error: errorApproved,
    data: dataApproved,
  } = useQuery(QUERY_APPROVED_BLOGS, {
    variables: { userID: Auth.getToken() },
  });

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
      <div className="home-container">
        <h1 className="ion-text-center">Account</h1>
        <IonButton expand="full" fill="clear">Create a new blog</IonButton>
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
                          <IonIcon icon={hourglassOutline} color="dark" />
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
                          <IonIcon icon={checkmarkOutline} color="success" />
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
    </PageComponent>
  );
};

export default AccountPage;
