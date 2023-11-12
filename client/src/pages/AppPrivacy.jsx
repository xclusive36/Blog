import { IonCard, IonCardContent } from "@ionic/react";
import Page from "../components/Page";

const AppPrivacy = () => {
  return (
    <Page>
      <h1 className="about-title" style={{ textAlign: "center" }}>
        Privacy Policy
      </h1>
      <IonCard>
        <IonCardContent>
          <p className="ion-padding">
            <strong>LITESTEP PRIVACY POLICY</strong>
            <br />
            This Privacy Policy is meant to help you understand what information
            we collect, why we collect it, and how you can update, manage,
            export, and delete your information.
          </p>

          <p className="ion-padding">
            <strong>INFORMATION LITESTEP COLLECTS</strong>
            <br />
            We merely store information on Google Cloud servers on your behalf.
            What ever data you create within the application its self, you have
            full control over. It’s your data to Add, Edit, or Delete. If you do
            not wish to store any information, simply delete it off of the
            application. You will need an active subscription to access any data
            within the application. We want you to understand that you are in
            control of your data.
          </p>

          <p className="ion-padding">
            <strong>Things you create or provide to us</strong>
            <br />
            When you create a LiteStep Account, you provide us with personal
            information that includes your name and a email address.
          </p>

          <p className="ion-padding">
            The content you add using the application is your own. We do not
            assume ownership of any information you input into the application.
          </p>

          <p className="ion-padding">
            <strong>Information we collect as you use our services</strong>
            <br />
            We may collect crash or bug reports sent by the application during
            usage.
          </p>

          <p className="ion-padding">
            We collect this information when a LiteStep service on your device
            contacts our servers — for example, when you install an app from the
            IOS App Store or when a service checks for automatic updates.
          </p>

          <p className="ion-padding">
            <strong>WHY LITESTEP COLLECTS DATA</strong>
            <br />
            We use your information to ensure our services are working as
            intended, such as tracking outages or troubleshooting issues that
            get report to us. We use that information to make improvements to
            our services.
          </p>

          <p className="ion-padding">
            We use the information we collect in existing services to help us
            develop new ones. We use the information we collect to provide
            personalized content.
          </p>

          <p className="ion-padding">
            We don’t share information that personally identifies you with
            advertisers, such as your name or email.
          </p>

          <p className="ion-padding">
            We use data for analytics and measurement to understand how our
            services are used. For example, we analyze data about your visits to
            our sites to do things like optimize product design. We use a
            variety of tools to do this, including Google Analytics.
            <br />
            Regards,
            <br />
            The LiteStep.com Team.
          </p>

          <p className="ion-padding">
            See it on the iOS App store:
            https://apps.apple.com/us/app/litestep/id1490896776
          </p>
        </IonCardContent>
      </IonCard>
    </Page>
  );
};

export default AppPrivacy;
