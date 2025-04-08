async function fetchCustomerData() {
  try {
    // 新しいエンドポイントURLを使用。type=getData を付与してアクセスする想定です
    const url = "https://script.google.com/macros/s/AKfycbyzq_3pNJwBI0FqUD1ctGSjwdBgACgkwjKImxhzMkRRBZ4rMsKs5teScSuTSO_Po1rX/exec?type=getData";
    const response = await fetch(url);
    const data = await response.json();
    
    console.log("取得データ:", data);
    
    const tbody = document.getElementById("userTableBody");
    tbody.innerHTML = "";
    
    data.forEach(record => {
      // 各プロパティが存在しない場合は空文字列に置換する
      const userId      = record.user_id       || "";
      const companyName = record.company_name  || "";
      const userName    = record.user_name     || "";
      const role        = record.role          || "";
      // 今回は、カテゴリはrecord.categories、エージェントはrecord.agents として返される前提
      const category    = record.categories    || "";
      const agent       = record.agents        || "";
      const lastLogin   = record.last_login    || "";
      
      // 詳細リンク。クリックするとモーダルなどで詳細が表示されるよう、data-userid属性を付与
      const detailLink = `<a href="#" class="detail-link" data-userid="${userId}">詳細</a>`;
      
      // 権限の値をリンク風に表示
      const roleDisplay = `<a href="#" class="role-link">${role}</a>`;
      
      // カテゴリ、エージェントの各セルに右側に「＋」ボタンを追加
      const categoryDisplay = `${category} <button class="plus-btn">＋</button>`;
      const agentDisplay = `${agent} <button class="plus-btn">＋</button>`;
      
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${userId}</td>
        <td>${companyName}</td>
        <td>${userName}</td>
        <td>${roleDisplay}</td>
        <td>${categoryDisplay}</td>
        <td>${agentDisplay}</td>
        <td>${lastLogin}</td>
        <td>${detailLink}</td>
      `;
      tbody.appendChild(tr);
    });
    
    // 詳細リンクのクリックイベントを登録（モーダルで詳細を表示する処理は detailModal.js 等に実装）
    const detailLinks = document.querySelectorAll(".detail-link");
    detailLinks.forEach(link => {
      link.addEventListener("click", function(e) {
        e.preventDefault();
        const userId = this.getAttribute("data-userid");
        showDetailModal(userId);
      });
    });
    
  } catch (error) {
    console.error("顧客データの取得に失敗しました:", error);
  }
}

window.onload = fetchCustomerData;
