import * as React from 'react';
import { PageSection, Content, ContentVariants } from '@patternfly/react-core';
import { useNavigate } from 'react-router-dom';
import CollapsibleSection from '~/concepts/design/CollapsibleSection';
import { SectionType, sectionTypeBorderColor } from '~/concepts/design/utils';
import notebookImagesImage from '~/images/UI_icon-Red_Hat-Notebook-Images-RGB.svg';
import servingRuntimesImage from '~/images/Icon-Red_Hat-Sys_admin-A-Black-RGB.svg';
import clusterSettingsImage from '~/images/Icon-Red_Hat-Storage-A-Black-RGB.svg';
import userImage from '~/images/UI_icon-Red_Hat-User-RGB.svg';
import DividedGallery from '~/concepts/design/DividedGallery';
import { useUser } from '~/redux/selectors';
import InfoGalleryItem from '~/concepts/design/InfoGalleryItem';
import { useBrowserStorage } from '~/components/browserStorage';
import { SupportedArea } from '~/concepts/areas';
import useIsAreaAvailable from '~/concepts/areas/useIsAreaAvailable';
import { fireLinkTrackingEvent } from '~/concepts/analyticsTracking/segmentIOUtils';

export const useEnableTeamSection = (): React.ReactNode => {
  const navigate = useNavigate();
  const [resourcesOpen, setResourcesOpen] = useBrowserStorage<boolean>(
    'odh.home.admin.open',
    true,
    true,
    false,
  );
  const { isAdmin } = useUser();
  const { status: notebooksAvailable } = useIsAreaAvailable(SupportedArea.BYON);
  const { status: servingRuntimesAvailable } = useIsAreaAvailable(SupportedArea.CUSTOM_RUNTIMES);
  const { status: clusterSettingsAvailable } = useIsAreaAvailable(SupportedArea.CLUSTER_SETTINGS);
  const { status: userManagementAvailable } = useIsAreaAvailable(SupportedArea.USER_MANAGEMENT);

  if (!isAdmin) {
    return null;
  }

  const trackAndNavigate = (section: string, to: string): void => {
    fireLinkTrackingEvent('HomeCardClicked', {
      to: `${to}`,
      type: 'enableTeam',
      section: `${section}`,
    });
    navigate(to);
  };

  const infoItems = [];

  if (notebooksAvailable) {
    infoItems.push(
      <InfoGalleryItem
        key="notebook-images"
        testId="landing-page-admin--notebook-images"
        isOpen={resourcesOpen}
        title="Notebook images"
        onClick={() => trackAndNavigate('notebook-images', '/notebookImages')}
        imgSrc={notebookImagesImage}
        sectionType={SectionType.setup}
        description={
          <Content component="small">
            These are instances of your development and experimentation environment. They typically
            contain IDEs, such as JupyterLab, RStudio, and Visual Studio Code.
          </Content>
        }
      />,
    );
  }
  if (servingRuntimesAvailable) {
    infoItems.push(
      <InfoGalleryItem
        key="serving-runtimes"
        testId="landing-page-admin--serving-runtimes"
        isOpen={resourcesOpen}
        title="Serving runtimes"
        onClick={() => trackAndNavigate('serving-runtimes', '/servingRuntimes')}
        imgSrc={servingRuntimesImage}
        sectionType={SectionType.setup}
        description={
          <Content component="small">
            A model-serving runtime adds support for a specified set of model frameworks. You can
            use a default serving runtime, or add and enable a custom serving runtime.
          </Content>
        }
      />,
    );
  }
  if (clusterSettingsAvailable) {
    infoItems.push(
      <InfoGalleryItem
        key="cluster-settings"
        testId="landing-page-admin--cluster-settings"
        isOpen={resourcesOpen}
        title="Cluster settings"
        onClick={() => trackAndNavigate('cluster-settings', '/clusterSettings')}
        imgSrc={clusterSettingsImage}
        sectionType={SectionType.setup}
        description={
          <Content component="small">
            You can change the default size of the cluster’s persistent volume claim (PVC) ensuring
            that the storage requested matches your common storage workflow.
          </Content>
        }
      />,
    );
  }
  if (userManagementAvailable) {
    infoItems.push(
      <InfoGalleryItem
        key="user-management"
        testId="landing-page-admin--user-management"
        isOpen={resourcesOpen}
        title="User management"
        onClick={() => trackAndNavigate('user-management', '/groupSettings')}
        imgSrc={userImage}
        sectionType={SectionType.setup}
        description={
          // eslint-disable-next-line no-restricted-syntax
          <Content component="small">
            If you plan to restrict access to your instance by defining specialized user groups, you
            must grant users permission access by adding user accounts to the Red Hat OpenShift AI
            user groups, administrator groups, or both.
          </Content>
        }
      />,
    );
  }

  if (!infoItems.length) {
    return null;
  }

  return (
    <PageSection hasBodyWrapper={false} data-testid="landing-page-admin">
      <CollapsibleSection
        title="Enable your team"
        titleVariant={ContentVariants.h1}
        open={resourcesOpen}
        setOpen={setResourcesOpen}
        showChildrenWhenClosed
      >
        <DividedGallery
          minSize="225px"
          itemCount={infoItems.length}
          style={{
            borderRadius: 16,
            border: `1px solid ${sectionTypeBorderColor(SectionType.setup)}`,
          }}
        >
          {infoItems}
        </DividedGallery>
      </CollapsibleSection>
    </PageSection>
  );
};
