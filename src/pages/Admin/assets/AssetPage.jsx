import React, { useState } from "react";
import useAdminAssets from "../../../custom_hooks/useAdminAssets";
import AssetFromModal from "./AssetFromModal";
import { useTranslation } from "react-i18next";

function AssetsPage() {
  const { t } = useTranslation();
  const [editingAsset, setEditingAsset] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    symbol: "",
    name: "",
    coingeckoId: "",
  });
  const { assets, setAssets, loading, error, loadAssets } = useAdminAssets();
  const [symbol, setSymbol] = useState("");

  const [name, setName] = useState("");

  const [coingeckoId, setCoingeckoId] = useState("");
  const saveAsset = async () => {
    try {
      const token = localStorage.getItem("token");

      const isEdit = editingAsset !== null;

      const url = isEdit
        ? `http://localhost:8080/api/admin/assets/${editingAsset.id}`
        : "http://localhost:8080/api/admin/assets";

      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(t("saveFailed"));
      }

      await loadAssets();

      setEditingAsset(null);

      setFormData({
        symbol: "",
        name: "",
        coingeckoId: "",
      });

      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleDelete = async (id) => {
    const confirmed = window.confirm(t("confirmDeleteAsset"));

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:8080/api/admin/assets/${id}`, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await loadAssets();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h2>{t("assets")}</h2>

        <button
          className="btn btn-success"
          onClick={() => {
            setEditingAsset(null);

            setFormData({
              symbol: "",
              name: "",
              coingeckoId: "",
            });

            setShowModal(true);
          }}
        >
          + {t("addAsset")}
        </button>
      </div>

      <table className="table table-hover bg-white shadow-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>{t("symbol")}</th>
            <th>{t("name")}</th>
            <th>{t("price")}</th>
            <th>{t("actions")}</th>
          </tr>
        </thead>

        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td>{asset.id}</td>

              <td>{asset.symbol}</td>

              <td>{asset.name}</td>

              <td>{asset.coingeckoId}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => {
                    setEditingAsset(asset);

                    setFormData({
                      symbol: asset.symbol,
                      name: asset.name,
                      coingeckoId: asset.coingeckoId,
                    });

                    setShowModal(true);
                  }}
                >
                  {t("edit")}
                </button>

                <button
                  onClick={() => handleDelete(asset.id)}
                  className="btn btn-danger btn-sm"
                >
                  {t("delete")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AssetFromModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingAsset(null);
        }}
        onSave={saveAsset}
        formData={formData}
        handleChange={handleChange}
        editingAsset={editingAsset}
      />
    </div>
  );
}

export default AssetsPage;