import { motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import errorCircle from "../../assets/error-circle.png";
import { X } from "@/assets/icons/x";

interface TextProps {
  children: ReactNode;
}

const Text = ({ children }: TextProps) => {
  return <p className="flex flex-col texte-black w-4/5">{children}</p>;
};

const Icon = () => {
  return <img className="size-10" src={errorCircle} alt="error" />;
};

interface AlertErrorProps {
  closeAlert: () => void;
  children: ReactNode;
}

export const AlertError = ({ children, closeAlert }: AlertErrorProps) => {
  useEffect(() => {
    const timer = setTimeout(closeAlert, 3000);
    return () => clearTimeout(timer);
  }, [closeAlert]);

  return (
    <motion.div
      animate={{ transform: "translateY(0) translateX(-50%)" }}
      initial={{ transform: "translateY(100%) translateX(-50%)" }}
      className="flex backdrop-blur-sm rounded-xl fixed bottom-4 left-1/2 justify-center items-center gap-4 w-[532px] bg-crmGray600 h-[79px]"
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

export function showAlertError(message: string) {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const root = createRoot(container);

  function handleClose() {
    root.unmount();
    document.body.removeChild(container);
  }

  root.render(<AlertError closeAlert={handleClose}>{message}</AlertError>);
}
