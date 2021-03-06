import React from 'react';
import { storiesOf } from '@storybook/react';
import CategoryList from 'components/CategoryList';
import Readme from '../docs/CategoryList.md';

const itemRenderer = ({ data = {} }) => <div>{data.description}</div>;

const categoryListData = [
  {
    title: 'Category One',
    catName: 'category-one',
    catData: {
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    },
  },
  {
    title: 'Category Two',
    catName: 'category-two',
    catData: {
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    },
  },
  {
    title: 'Category Three',
    catName: 'category-three',
    catData: {
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    },
  },
];

const categoryListDataWithSeperator = [
  ...categoryListData,
  {
    title: 'Category Four',
    catName: 'category-four',
    topSeperatorComponent: <hr />,
    catData: {
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
    },
  },
];

const DefaultCategoryList = (props = {}) => {
  const defaultProps = {
    data: categoryListData,
    itemRenderer,
  };

  const testProps = { ...defaultProps, ...props };

  return <CategoryList {...testProps} />;
};

const ClickComponent = ({ identifier, title, isOpen, toggleFn }) => (
  <button type="button" data-id={identifier} onClick={toggleFn}>
    {`${title} ${isOpen ? '-' : '+'}`}
  </button>
);

storiesOf('Category List', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('Category List default', () => <DefaultCategoryList />)
  .add('Category List with custom click component', () => (
    <DefaultCategoryList clickComponent={ClickComponent} />
  ))
  .add('Category List with separator component', () => (
    <DefaultCategoryList
      clickComponent={ClickComponent}
      data={categoryListDataWithSeperator}
    />
  ))
  .add('Category List open by default', () => (
    <DefaultCategoryList
      clickComponent={ClickComponent}
      data={categoryListData}
      isOpenByDefault
    />
  ));
