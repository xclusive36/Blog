import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  IonText,
} from "@ionic/react";
import { closeCircle, createOutline } from "ionicons/icons";
import PropTypes from "prop-types";

export const AccountItemComponent = ({
  handleSearch,
  handleLoadMore,
  handleEditItem,
  handleRemoveItem,
  loading,
  blogs,
  error,
  blogsCount,
}) => {
  const convertDate = (date) => {
    // return the date in the format of Month Day, Year
    const dateObject = new Date(date);
    const month = dateObject.toLocaleString("default", { month: "long" });
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return (
    <IonCard>
      <IonCardContent>
        <IonSearchbar onIonInput={handleSearch} />
        <IonCardTitle>Blogs waiting approval:</IonCardTitle>
        <IonList>
          {loading && (
            <IonItem>
              <IonLabel className="ion-text-wrap">
                <div>Loading...</div>
              </IonLabel>
            </IonItem>
          )}
          {blogs.map((blog) => (
            <IonItem key={blog._id}>
              <IonLabel className="ion-text-wrap">
                <a href={`/blog/${blog.slug}`} className="blog-item-link">
                  {blog.title}
                </a>
                <div className="submitted-on">
                  Published by {blog.username} on {convertDate(blog.date)}
                </div>
              </IonLabel>
              <IonButtons slot="end">
                <IonButton
                  onClick={handleEditItem(blog)}
                  fill="clear"
                  color="dark">
                  <IonIcon slot="icon-only" icon={createOutline} />
                </IonButton>
                <IonButton
                  onClick={handleRemoveItem(blog._id)}
                  fill="clear"
                  color="danger">
                  <IonIcon slot="icon-only" icon={closeCircle} />
                </IonButton>
              </IonButtons>
            </IonItem>
          ))}
          {error && (
            <IonItem>
              <IonLabel className="ion-text-wrap">
                <div className="blog-item-link">Error loading blogs</div>
                <div>{error.message}</div>
              </IonLabel>
            </IonItem>
          )}
          {blogs.length === 0 && !error
            ? !loading && (
                <IonItem>
                  <IonLabel className="ion-text-wrap">
                    <div>No blogs waiting approval</div>
                  </IonLabel>
                </IonItem>
              )
            : blogs.length < blogsCount && (
                <IonItem lines="none" className="ion-text-center">
                  <IonLabel>
                    <IonButton
                      onClick={handleLoadMore}
                      expand="block"
                      disabled={blogs.length === blogsCount}>
                      <IonText className="small">Load More</IonText>
                    </IonButton>
                    <div className="submitted-on">
                      {blogs.length} of {blogsCount}
                    </div>
                  </IonLabel>
                </IonItem>
              )}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

AccountItemComponent.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleLoadMore: PropTypes.func.isRequired,
  handleEditItem: PropTypes.func.isRequired,
  handleRemoveItem: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      slug: PropTypes.string,
      username: PropTypes.string,
      date: PropTypes.string,
    })
  ),
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  blogsCount: PropTypes.number,
};
