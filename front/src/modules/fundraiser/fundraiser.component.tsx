import { useTheme } from "@emotion/react";
import Dialog from "rc-dialog";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Address } from "viem";
import Upvote from "../../assets/icons/upvote.svg?react";
import {
  Button,
  DocumentContainer,
  FundraiserCertificate,
  NumberInput,
  Spacer,
  TextArea,
} from "../../common/components";
import { useAdministrationStatusHook } from "../../common/hooks";
import { ButtonType } from "../../common/types/button.type";
import {
  FundraiserStatusValue,
  FundraiserStatusValueToString,
} from "../../common/types/fundraiser-status.type";
import { CommentItem } from "./components/comment-item/comment-item.component";
import { DonationItem } from "./components/donation-item/donation-item.component";
import {
  bottomContainer,
  bottomDonationContainer,
  bottomSpacer,
  buttonDonateContainer,
  buttonDonateLeftContainer,
  buttonModerationContainer,
  certificateButton,
  certificateDownloadButton,
  container,
  declineModerationContainer,
  declineReasonContainer,
  description,
  dialog,
  fundraiserGrid,
  image,
  imageContainer,
  infoText,
  sectionSelection,
  sectionSelectionContainer,
  sectionSelectionText,
  statusText,
  text,
  title,
  upvoteArrow,
  upvoteContainer,
} from "./fundraiser.styles";
import { useCertificate } from "./hooks/use-certificate.hook";
import { useCommentFundraiser } from "./hooks/use-comment-fundraiser.hook";
import { useDonateFundraiser } from "./hooks/use-donate-fundraiser.hook";
import { useModerateFundraiser } from "./hooks/use-moderate-fundraiser.hook";
import { useReadFundraiser } from "./hooks/use-read-fundraiser.hook";
import { useVoteFundraiser } from "./hooks/use-vote-fundraiser.hook";
import { useWithdraw } from "./hooks/use-withdraw.hook";
import { Section } from "./types/section.type";

export const Fundraiser: React.FC = () => {
  const { isAdmin } = useAdministrationStatusHook();
  const { fundraiserAddress } = useParams();
  const { fundraiser } = useReadFundraiser(fundraiserAddress as Address);
  const { donate, donations } = useDonateFundraiser(
    fundraiserAddress as Address
  );
  const { comment: commentFundraiser, comments } = useCommentFundraiser(
    fundraiserAddress as Address
  );
  const { upvote, upvoteCount, isVoted } = useVoteFundraiser(
    fundraiserAddress as Address
  );
  const { approve, decline } = useModerateFundraiser(
    fundraiserAddress as Address
  );
  const { canWithdraw, withdraw } = useWithdraw(fundraiserAddress as Address);

  const [declineReason, setDeclineReason] = useState("");
  const [selectedSection, setSelectedSection] = useState<Section>(
    Section.DONATIONS
  );
  const [comment, setComment] = useState("");
  const [donateAmount, setDonateAmount] = useState(0);

  useEffect(() => {
    setComment("");
  }, [selectedSection]);

  const theme = useTheme();

  const certificateRef = useRef(null);
  const { getCertificate } = useCertificate(certificateRef);

  function reasonChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setDeclineReason(event.target.value);
  }

  function commentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setComment(event.target.value);
  }

  const [dialogOpen, setDialogOpen] = useState(false);

  if (!fundraiser) {
    return <></>;
  }

  return (
    <div css={container}>
      <div css={fundraiserGrid}>
        {fundraiser.image && (
          <>
            <div css={imageContainer}>
              <img src={fundraiser.image} alt="fundraiser" css={image(theme)} />
            </div>
            <div>
              <Spacer isVertical={true} isThick={true} isRounded={true} />
            </div>
          </>
        )}

        <div>
          <h1 css={title(theme)}>{fundraiser.title}</h1>
          <p css={text(theme)}>
            Deadline: {fundraiser.deadline.toLocaleDateString()}
          </p>
          <p css={text(theme)}>
            Status:{" "}
            <span css={statusText(theme, fundraiser.status)}>
              {FundraiserStatusValueToString[fundraiser.status]}
            </span>
          </p>
          <p css={text(theme)}>
            Goal: {fundraiser.goal.toString()} Token{fundraiser.goal > 1 && "s"}
          </p>
          <p css={text(theme)}>
            Collected: {fundraiser.totalDonations.toString()} Token{fundraiser.totalDonations > 1 && "s"}
          </p>
        </div>

        <div css={description(theme)}>
          <p>{fundraiser.description}</p>
        </div>

        <div css={bottomContainer}>
          {fundraiser.status === FundraiserStatusValue.APPROVED ? (
            <div css={upvoteContainer}>
              <Upvote
                css={upvoteArrow(theme, isVoted)}
                onClick={upvote}
                width={25}
                height={25}
              />
              <h3 css={infoText(theme)}>{upvoteCount.toLocaleString()}</h3>
            </div>
          ) : (
            <div></div>
          )}
          <h3 css={infoText(theme)}>{fundraiser.beneficiary}</h3>
          {fundraiser.status === FundraiserStatusValue.APPROVED &&
          canWithdraw ? (
            <Button
              className={certificateButton}
              text="Withdraw"
              onClick={withdraw}
            />
          ) : (
            <div></div>
          )}
          {[
        FundraiserStatusValue.APPROVED,
        FundraiserStatusValue.FINISHED,
      ].includes(fundraiser.status) ? (
            <Button
              className={certificateButton}
              text="Certificate"
              onClick={() => setDialogOpen(true)}
            />
          ) : (
            <div></div>
          )}
          <h3 css={infoText(theme)}>
            {fundraiser.createdAt.toLocaleDateString()}
          </h3>
        </div>

        <Spacer className={bottomSpacer} />
      </div>
      {[
        FundraiserStatusValue.APPROVED,
        FundraiserStatusValue.FINISHED,
      ].includes(fundraiser.status) && (
        <div css={sectionSelectionContainer}>
          <div css={sectionSelection}>
            <h1
              onClick={() => setSelectedSection(Section.DONATIONS)}
              css={sectionSelectionText(
                theme,
                selectedSection === Section.DONATIONS
              )}
            >
              Donations
            </h1>
            <h1
              onClick={() => setSelectedSection(Section.COMMENTS)}
              css={sectionSelectionText(
                theme,
                selectedSection === Section.COMMENTS
              )}
            >
              Comments
            </h1>
          </div>
          <Spacer />
        </div>
      )}
      {[
        FundraiserStatusValue.APPROVED,
        FundraiserStatusValue.FINISHED,
      ].includes(fundraiser.status) &&
        selectedSection === Section.DONATIONS && (
          <div css={bottomDonationContainer}>
            {fundraiser.status === FundraiserStatusValue.APPROVED && (
              <div css={buttonDonateContainer}>
                <div css={buttonDonateLeftContainer}>
                  <Button
                    onClick={() => donate(donateAmount, comment)}
                    type={ButtonType.FILLED}
                    text="Donate"
                  />
                  <NumberInput
                    defaultValue={0}
                    min={0}
                    onChange={setDonateAmount}
                  />
                </div>
                <TextArea
                  placeholder="Enter comment"
                  onChange={commentChange}
                />
              </div>
            )}
            {donations.map((item) => (
              <>
                <DonationItem
                  comment={item.comment}
                  amount={item.amount}
                  address={item.sender}
                />
                <Spacer />
              </>
            ))}
          </div>
        )}
      {[
        FundraiserStatusValue.APPROVED,
        FundraiserStatusValue.FINISHED,
      ].includes(fundraiser.status) &&
        selectedSection === Section.COMMENTS && (
          <div css={bottomDonationContainer}>
            {fundraiser.status === FundraiserStatusValue.APPROVED && (
              <div css={buttonDonateContainer}>
                <div css={buttonDonateLeftContainer}>
                  <Button
                    onClick={() => commentFundraiser(comment)}
                    type={ButtonType.FILLED}
                    text="Send comment"
                  />
                </div>
                <TextArea
                  placeholder="Enter comment"
                  onChange={commentChange}
                />
              </div>
            )}
            {comments.map((item) => (
              <>
                <CommentItem comment={item.comment} address={item.sender} />
                <Spacer />
              </>
            ))}
          </div>
        )}
      {isAdmin && fundraiser.status === FundraiserStatusValue.PENDING && (
        <div css={buttonModerationContainer}>
          <Button onClick={approve} type={ButtonType.APPROVE} text="Approve" />
          <div css={declineModerationContainer}>
            <Button
              onClick={() => {
                decline(declineReason);
              }}
              type={ButtonType.DECLINE}
              text="Decline"
            />
            <TextArea onChange={reasonChange} />
          </div>
        </div>
      )}
      {fundraiser.declineReason && (
        <div css={declineReasonContainer}>
          <p css={text(theme)}>Decline reason: {fundraiser.declineReason}</p>
        </div>
      )}
      <Dialog
        maskAnimation="fade"
        animation="zoom"
        closeIcon={<></>}
        style={dialog}
        onClose={() => setDialogOpen(false)}
        visible={dialogOpen}
      >
        <div>
          <FundraiserCertificate
            isPreview={true}
            status={fundraiser.status}
            totalDonations={fundraiser.totalDonations}
            goal={fundraiser.goal}
            deadline={fundraiser.deadline}
            beneficiarAddress={fundraiser.beneficiary}
            fundraiserAddress={fundraiserAddress}
            title={fundraiser.title}
          />
          <Button
            className={certificateDownloadButton}
            text="Download"
            onClick={() => {
              getCertificate();
              setDialogOpen(false);
            }}
          />
        </div>
      </Dialog>
      <DocumentContainer>
        <FundraiserCertificate
          isPreview={false}
          status={fundraiser.status}
          totalDonations={fundraiser.totalDonations}
          goal={fundraiser.goal}
          deadline={fundraiser.deadline}
          beneficiarAddress={fundraiser.beneficiary}
          fundraiserAddress={fundraiserAddress}
          ref={certificateRef}
          title={fundraiser.title}
        />
      </DocumentContainer>
    </div>
  );
};
