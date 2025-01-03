import { useTheme } from "@emotion/react";
import React, { ChangeEvent, useState } from "react";
import { zeroAddress } from "viem";
import { Button, TextArea } from "../../common/components";
import { BenefactorRequestStatusValueToString } from "../../common/types";
import { ButtonType } from "../../common/types/button.type";
import {
  buttonsContainer,
  container,
  content,
  statusText,
  textArea,
} from "./create-benefactor-request.styles";
import { useCreateBenefactorRequest } from "./hooks/use-create-benefactor-request.hook";

export const BenefactorRequestCreate: React.FC = () => {
  const { request, sendRequest } = useCreateBenefactorRequest();
  const [comment, setComment] = useState("");

  function addressChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setComment(event.target.value);
  }

  const theme = useTheme();

  return (
    <div css={container(theme)}>
      <h1>Benefactor Request</h1>
      {request?.sender === zeroAddress ? (
        <div css={content}>
          <TextArea
            css={textArea}
            placeholder="Request comment"
            onChange={addressChange}
          />
          <div css={buttonsContainer}>
            <Button
              onClick={() => sendRequest(comment)}
              type={ButtonType.FILLED}
              text="Send Request"
            />
          </div>
        </div>
      ) : (
        <div>
          <h1>Request info:</h1>
          {request?.status !== undefined && (
            <h3>
              Status:{" "}
              <span css={statusText(theme, request.status)}>{BenefactorRequestStatusValueToString[request?.status ?? 0]}</span>
            </h3>
          )}
          <h3>Comment: {request?.comment}</h3>
          {request?.declineReason && (
            <h3>Decline reason: {request.declineReason}</h3>
          )}
        </div>
      )}
    </div>
  );
};
