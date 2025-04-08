async function fetchCustomerData() {
  try {
    const url = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhN2H25AGloJkqN67bPwyfBEkJYDEFyDT-iXZdOk5vgfnizbagYygz_Kcj9ta78_LS7JYuiXqJpnn0T5aia8KX4Eu-U9WOHjnYW6RhbyGPzecSzb4nA3_hFJGckd7fYAQEoVHNvdOzBq6Nhmdid2p-2W9m3YYM3l7szFQ2N4RQqRsbOavHdQFA9XHdOQbNk0qfCtA55xRr2F_wSyhaBSViSoTeq7CkL4J0ONZHoKUOU4_EjRbyxQIs5R5iys0jK-xPjXy33eCh3vFxy5swI1XrgN5keCnQIr6gWk6l4Y2kK1DcMA7c&lib=MDZUUTRJxMBEuuaiVotVbVWdJHcgl-QcZ&type=getData";
    const response = await fetch(url);
    const data = await response.json();
    
    console.log("取得データ:", data);
    
    const tbody = document.getElementById("userTableBody");
    tbody.innerHTML = "";
    
    data.forEach(record => {
      // 各プロパティが存在しない場合は空文字列に置換
      const userId      = record.user_id       || "";
      const companyName = record.company_name  || "";
      const userName    = record.user_name     || "";
      const role        = record.role          || "";
      const category    = record.categories    || "";
      const agent       = record.agents        || "";
      const lastLogin   = record.last_login    || "";
      
      // 詳細リンク
      const detailLink = `<a href="customer_detail.html?id=${userId}">詳細</a>`;
      
      // 権限の値をリンク風にする
      const roleDisplay = `<a href="#" class="role-link">${role}</a>`;
      
      // データセル内で、カテゴリとエージェントの値の右側に「＋」ボタンを追加
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
  } catch (error) {
    console.error("顧客データの取得に失敗しました:", error);
  }
}

window.onload = fetchCustomerData;
