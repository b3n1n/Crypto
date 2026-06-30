import CryptoInfo from "./CryptoInfo";
import { useTranslation } from "react-i18next";

function MarketBody({ coins }) {
  const { t } = useTranslation();

  return (
    <div className="m-4 text-center">
      <h2>{t("marketOverview")}</h2>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>{t("name")}</th>
            <th>{t("price")}</th>
            <th>{t("change24h")}</th>
            <th>{t("volume")}</th>
            <th>{t("marketCap")}</th>
          </tr>
        </thead>

        <tbody>
          {coins.map((coin, index) => (
            <CryptoInfo
              key={coin.id}
              index={index + 1}
              coin={coin}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MarketBody;