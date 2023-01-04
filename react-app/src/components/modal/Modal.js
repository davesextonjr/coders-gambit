export function Modal({ onClose, children, cssClass}) {
    const className = `modal-content ${cssClass}`
    return ReactDOM.createPortal(
      <div className="modal" >
        <div className="modal-background" onClick={onClose} />
        <div className={className} >
          <button className="close" onClick={onClose}>x</button>
          {children}
        </div>
      </div>

    );
  }
