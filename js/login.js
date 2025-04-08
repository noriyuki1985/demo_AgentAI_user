document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  
  // 分岐①：Ownerの場合（例: "owner@owner" / "a"）
  if (email.toLowerCase() === "owner@owner" && password === "a") {
    window.location.href = "dashboard_owner.html";
    return;
  }
  
  // 分岐②：それ以外の場合は、ログインAPIを呼び出す
  try {
    const scriptUrl = "https://script.google.com/macros/s/AKfycbyTpjISP_ED0hDFucZbFR6fOuFtiAza9kSeG72YC5l4YBsX-MRTBBs0uFVj7ljdl-SV/exec";
    const loginUrl = scriptUrl + "?type=login&email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password);
    
    const res = await fetch(loginUrl);
    const data = await res.json();
    
    if (data.success) {
      // 取得した顧客情報を sessionStorage に保存（必要なら）
      sessionStorage.setItem("userData", JSON.stringify(data));
      window.location.href = "dashboard_user.html";
    } else {
      alert("ログイン失敗: " + data.message);
    }
  } catch (error) {
    console.error("ログイン処理でエラー:", error);
    alert("ログイン処理に失敗しました。");
  }
});
