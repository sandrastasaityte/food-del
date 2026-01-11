import add_icon from "./add_icon.png";
import dashboard_icon from "./dashboard_icon.png";
import logo from "./logo.png";
import parcel_icon from "./parcel_icon.png";
import upload_area from "./upload_area.png";

export const assets = Object.freeze({
  add_icon,
  dashboard_icon,
  logo,
  parcel_icon,
  upload_area,

  // fallbacks so components that expect these don't crash
  list_icon: dashboard_icon,
  order_icon: parcel_icon,
});
