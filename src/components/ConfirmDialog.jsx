export default function ConfirmDialog({ message, onYes, onNo }) {
  return (
    <div className="modal-bg" role="dialog" aria-modal="true" aria-label="Confirm">
      <div className="modal small-modal">
        <p>{message}</p>
        <div className="row end">
          <button className="btn ghost" onClick={onNo}>Cancel</button>
          <button className="btn danger" autoFocus onClick={onYes}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
