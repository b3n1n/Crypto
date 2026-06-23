import React from "react";

function AssetFromModal({
  show,
  onClose,
  onSave,
  formData,
  handleChange,
  editingAsset,
}) {
  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {editingAsset ? "Edit Asset" : "Add Asset"}
            </h5>

            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Symbol (BTC)"
              name="symbol"
              value={formData.symbol}
              onChange={handleChange}
            />

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Name (Bitcoin)"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="text"
              className="form-control"
              placeholder="CoinGecko ID (bitcoin)"
              name="coingeckoId"
              value={formData.coingeckoId}
              onChange={handleChange}
            />
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>

            <button className="btn btn-success" onClick={onSave}>
              {editingAsset ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssetFromModal;
