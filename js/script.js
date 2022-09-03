const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();
  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  if (url === "") {
    alert("Please entre a URL");
  } else {
    showSpinner();

    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);

      setTimeout(() => {
        const saveUrl = qr.querySelector("img").src;
        console.log(saveUrl);
        createSaveButton(saveUrl);
      }, 50);
    }, 1000);
  }
};

const generateQRCode = (url, size) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
    colorDark: "#1B294B",
  });
};

const clearUI = () => {
  qr.innerHTML = "";
  const saveBtn = document.getElementById("save-link");
  if (saveBtn) {
    saveBtn.remove();
  }
};

const createSaveButton = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    "bg-red-500 rounded py-2 m-auto w-1/3 my-5 text-white font-bold hover:bg-red-700";
  link.href = saveUrl;
  link.download = "qrcode";
  link.innerHTML = "Save Image";
  document.getElementById("generated").appendChild(link);
};

const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};

const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};

form.addEventListener("submit", onGenerateSubmit);
