import React from "react";
import { useTranslation } from "react-i18next";

function AssetFromModal({
  show,
  onClose,
  onSave,
  formData,
  handleChange,
  editingAsset,
}) {
  const { t } = useTranslation();
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
              {editingAsset ? t("editAsset") : t("addAsset")}
            </h5>

            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <input
              type="text"
              className="form-control mb-3"
              placeholder={t("symbolPlaceholder")}
              name="symbol"
              value={formData.symbol}
              onChange={handleChange}
            />

            <input
              type="text"
              className="form-control mb-3"
              placeholder={t("namePlaceholder")}
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="text"
              className="form-control"
              placeholder={t("coingeckoIdPlaceholder")}
              name="coingeckoId"
              value={formData.coingeckoId}
              onChange={handleChange}
            />
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              {t("cancel")}
            </button>

            <button className="btn btn-success" onClick={onSave}>
              {editingAsset ? t("update") : t("save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssetFromModal;