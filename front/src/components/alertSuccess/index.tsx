import { motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { X } from "../../assets/icons/x";
import successCircle from "../../assets/success-circle.png";

interface TextProps {
  children: ReactNode;
}

const Text = ({ children }: TextProps) => {
  return <p className="flex flex-col texte-black w-4/5">{children}</p>;
};

const Icon = () => {
  return <img className="size-10 ml-4" src={successCircle} alt="error" />;
};

interface AlertSuccessProps {
  closeAlert: () => void;
  children: ReactNode;
}

export const AlertSuccess = ({ children, closeAlert }: AlertSuccessProps) => {
  useEffect(() => {
    const timer = setTimeout(closeAlert, 3000);
    return () => clearTimeout(timer);
  }, [closeAlert]);

  return (
    <motion.div
      animate={{ transform: "translateY(0) translateX(-50%)" }}
      initial={{ transform: "translateY(-100%) translateX(-50%)" }}
      className="flex backdrop-blur-sm rounded-xl fixed top-3 right-3 justify-center items-center gap-4 w-72 h-28 bg-crmGray600"
    >
      <Icon />
      <Text>{children}</Text>
      <button
        type="button"
        onClick={closeAlert}
        className="absolute top-2 right-5"
      >
        <X />
      </button>
    </motion.div>
  );
};

export function showAlertSuccess(message: string) {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const root = createRoot(container);

  function handleClose() {
    root.unmount();
    document.body.removeChild(container);
  }

  root.render(<AlertSuccess closeAlert={handleClose}>{message}</AlertSuccess>);
}
