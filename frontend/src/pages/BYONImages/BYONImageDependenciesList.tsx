import * as React from 'react';
import {
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Content,
  Content,
} from '@patternfly/react-core';

type BYONImageDependenciesListProps = {
  dependencies: string[];
  term: string;
};

const BYONImageDependenciesList: React.FC<BYONImageDependenciesListProps> = ({
  term,
  dependencies,
}) => {
  if (dependencies.length === 0) {
    return null;
  }

  return (
    <DescriptionListGroup>
      <DescriptionListTerm>{term}</DescriptionListTerm>
      <DescriptionListDescription>
        <Content>
          {dependencies.map((dep, i) => (
            <Text style={{ marginBottom: 0 }} key={i} component="small">
              {dep}
            </Text>
          ))}
        </Content>
      </DescriptionListDescription>
    </DescriptionListGroup>
  );
};

export default BYONImageDependenciesList;
