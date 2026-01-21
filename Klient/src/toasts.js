import { toast } from "react-toastify";

export const toastSuccess = (msg = "Poprawnie zapisano zmiany") =>
  toast.success(msg);

export const toastError = (msg = "Wystąpił błąd") =>
  toast.error(msg);
