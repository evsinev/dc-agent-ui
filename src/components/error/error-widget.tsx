import { useState } from 'react';
import { styled, keyframes } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Error from './interface';

const showAnimation = keyframes`
  16% {
    transform: translate(0, 8px)
  }
  33% {
    transform: translate(0, -6px)
  }
  50% {
    transform: translate(0, 4px)
  }
  66% {
    transform: translate(0, -2px)
  }
  83% {
    transform: translate(0, 1px)
  }
  100% {
    transform: translate(0, 0)
  }
`;

const hideAnimation = keyframes`
  0% {
    transform: translate(0, -20px);
    opacity: 1;
  }
  100% {
    transform: translate(0, 2000px);
    opacity: 0;
  }
`;

const ErrorMessageRoot = styled('div')<{ hide: boolean; index: number }>`
  position: fixed;
  left: 15px;
  bottom: ${(p) => p.index * 180 + 15}px;
  width: 400px;
  min-height: 100px;
  max-width: 90vw;
  padding: 16px 24px;
  z-index: ${(p) => p.theme.zIndex.tooltip};
  background: ${(p) => p.theme.palette.error.main};
  color: ${(p) => p.theme.palette.primary.contrastText};

  font-size: 14px;
  font-weight: bold;
  line-height: 1.8;

  animation: ${(p) => (p.hide ? hideAnimation : showAnimation)} 1s ease-in-out;
`;

const Field = styled('div')`
  display: inline-block;
  min-width: 60px;
  margin-right: 8px;
`;

const CloseButton = styled('button')`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  width: 30px;
  height: 30px;
  top: 10px;
  right: 10px;
  z-index: ${(p) => p.theme.zIndex.tooltip};
  background: ${(p) => p.theme.palette.error.main};
  border: none;
  outline: none;
`;

interface ErrorMessageProps {
  error: Error;
  onClose: () => void;
  index: number;
}

export default function ErrorWidget({ error, onClose, index }: ErrorMessageProps) {
  const [hide, setHide] = useState<boolean>(false);
  if (!error) {
    return null;
  }

  const close = () => {
    setHide(true);
    setTimeout(() => {
      onClose();
    }, 900);
  };

  return (
    <ErrorMessageRoot
      id={error.errorId}
      datatype="error-message-root"
      hide={hide}
      index={index}
      sx={{ boxShadow: 3 }}
    >
      {Object.keys(error).map((fieldName) => (
        <div key={fieldName}>
          <Field datatype={fieldName}>
            {fieldName}
            :
          </Field>
          <span>{error[fieldName as keyof typeof error]}</span>
        </div>
      ))}

      <CloseButton onClick={close}>
        <CloseIcon sx={{ color: 'primary.contrastText' }} />
      </CloseButton>
    </ErrorMessageRoot>
  );
}
