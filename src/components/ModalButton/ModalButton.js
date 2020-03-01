import React, { useRef } from 'react';
import AnimatedButton from '../AnimatedButton';
import Modal from '../Modal';

function ModalButton({ icon: Icon, className, content }) {
  const modalRef = useRef({});

  function onClick(e) {
    const { clientX, clientY } = e;
    const xPercentage = (clientX * 100) / window.innerWidth;
    const yPercentage = (clientY * 100) / window.innerHeight;
    modalRef.current.show(xPercentage, yPercentage);
  }

  return (
    <>
      <AnimatedButton className={`${className}`} onClick={onClick}>
        <Icon />
      </AnimatedButton>
      <Modal ref={modalRef}>{content(modalRef.current)}</Modal>
    </>
  );
}

export default ModalButton;
