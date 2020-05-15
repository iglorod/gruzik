import React, { useState } from 'react';

const ModalWrapper = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { modal: Modal } = props;

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  return (
    <>
      <div
        className={props.className}
        onClick={props.disabled ? null : openModal}
      >
        {props.label}
      </div>
      <Modal open={modalIsOpen} closeModal={closeModal} />
    </>
  )
}

export default ModalWrapper;
