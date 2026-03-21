import { css } from "@emotion/react";
import { colors, spaces } from "../../common/styles";
import { Theme } from "../../common/types";

export const container = (theme: Theme) => css`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  gap: ${spaces[3]};
  align-items: center;
  flex-direction: column;
  width: 100%;
  color: ${theme.colors.secondary};
`;
export const content = css`
  display: flex;
  width: fit-content;
  width: 500px;
  flex-direction: column;
  gap: ${spaces[3]};
`;
export const textArea = css`
  min-height: 400px;
`;
export const buttonsContainer = css`
  display: flex;
  justify-content: center;

  gap: ${spaces[3]};
  button {
    flex: 1;
  }
`;
export const statusText = (theme: Theme, status: number) => {
  let color;
  if (status === 0) color = theme.colors.secondary;
  else if (status === 1) color = colors.green;
  else if (status === 2) color = colors.red;
  else if (status === 3) color = colors.blue;
  return css`
    color: ${color};
  `;
};
