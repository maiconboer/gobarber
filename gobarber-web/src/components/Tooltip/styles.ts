import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    background: #ff9000;
    color: #312e38;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: all 0.4s;
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    visibility: hidden;

    &::before {
      content: '';
      border-style: solid;
      border-color: #ff9900 transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      left: 50%;
      position: absolute;
      transform: translateX(-50%);
      color: #312e38;
    }
  }

  &:hover span {
    opacity: 1;
    transition: all 0.4s;
    visibility: visible;
  }
`;
