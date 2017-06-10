import React, { PropTypes } from 'react';
import styled from 'styled-components';

const SpaceCursorBlock = styled.div`
  margin: 5px;
  width: 60px;
  height: 60px;
  position: relative;
`;

const Arrow = styled.button`
  position: absolute;
  padding: 0px;
  width: 0;
  height: 0;
  border: 10px solid transparent;
`;

const UpArrow = styled(Arrow)`
  top: 0px;
  left: 20px;
  border-top-width: 0px;
  border-bottom-color: white;
  &:active {
    border-bottom-color: red;
  }
`;

const RightArrow = styled(Arrow)`
  top: 20px;
  right: 0px;
  border-right-width: 0px;
  border-left-color: white;
  &:active {
    border-left-color: red;
  }
`;

const DownArrow = styled(Arrow)`
  bottom: 0px;
  left: 20px;
  border-bottom-width: 0px;
  border-top-color: white;
  &:active {
    border-top-color: red;
  }
`;

const LeftArrow = styled(Arrow)`
  top: 20px;
  left: 0px;
  border-left-width: 0px;
  border-right-color: white;
  &:active {
    border-right-color: red;
  }
`;

function SpaceCursor(props) {
  return (
    <SpaceCursorBlock>
      <UpArrow onClick={() => props.moveTo('up')} />
      <RightArrow onClick={() => props.moveTo('right')} />
      <DownArrow onClick={() => props.moveTo('down')} />
      <LeftArrow onClick={() => props.moveTo('left')} />
    </SpaceCursorBlock>
  );
}

SpaceCursor.propTypes = {
  moveTo: PropTypes.func,
};

export default SpaceCursor;
