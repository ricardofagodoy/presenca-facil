import React from 'react';
import Alert from '../../views/components/Alert';
import renderer from 'react-test-renderer';

Date.now = jest.fn(() => 1482363367071);

test('Alert show text when present', () => {

  const component = renderer.create(
    <Alert message="message" />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Alert hide when text not present', () => {
    
      const component = renderer.create(
        <Alert />
      );
    
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });