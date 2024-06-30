import toast from "react-hot-toast";

export const handleClick = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!", { position: "top-center" });
  } catch (err) {
    console.error("Failed to copy using navigator.clipboard:", err);
    try {
      const input = document.createElement("input");
      input.style.position = "fixed";
      input.style.opacity = "0";
      input.value = window.location.href;
      document.body.appendChild(input);
      input.focus();
      input.select();
      const result = document.execCommand("copy");
      document.body.removeChild(input);
      if (result) {
        toast.success("Link copied to clipboard!", { position: "top-center" });
      } else {
        throw new Error("Failed to copy using fallback method.");
      }
    } catch (err) {
      console.error("Failed to copy using fallback method:", err);
      toast.error("Failed to copy link to clipboard!", {
        position: "top-center",
      });
    }
  }
};
