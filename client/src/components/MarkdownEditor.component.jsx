import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
  IonTextarea,
} from "@ionic/react";
import { useState } from "react";
import Markdown from "react-markdown";
import { informationCircleOutline, arrowUpOutline } from "ionicons/icons";

const MarkdownEditor = () => {
  const [markdownContent, setMarkdownContent] = useState("");

  const handleChange = (e) => {
    setMarkdownContent(e.target.value);
  };

  return (
    <div className="MarkdownEditor">
      <IonCard>
        <IonItem>
          <IonLabel>
            <IonCardTitle>Markdown Editor</IonCardTitle>
          </IonLabel>
          <IonButton
            href="https://www.markdownguide.org/cheat-sheet/"
            target="_blank"
            fill="clear"
          >
            <IonIcon slot="icon-only" icon={informationCircleOutline} />
          </IonButton>
        </IonItem>
        <IonCardContent>
          <IonTextarea
            fill="solid"
            mode="md"
            labelPlacement="stacked"
            rows={10}
            placeholder="Type something here in markdown..."
            value={markdownContent}
            onIonInput={handleChange}
          />
          <div className="ion-text-center ion-padding">
            <IonButton>Submit</IonButton>
          </div>
        </IonCardContent>
      </IonCard>
      <IonCard>
        <IonItem>
          <IonLabel>
            <IonCardTitle>Markdown Preview</IonCardTitle>
          </IonLabel>
        </IonItem>
        <IonCardContent>
          {markdownContent ? (
            <article>
              <Markdown>{markdownContent}</Markdown>
            </article>
          ) : (
            <div>
              Nothing to preview, type something in the editor.{" "}
              <IonIcon icon={arrowUpOutline} />
            </div>
          )}
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default MarkdownEditor;
