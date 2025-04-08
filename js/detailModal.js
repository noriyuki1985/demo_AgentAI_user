@@ -0,0 +1,54 @@
 // 詳細ボタン（モーダル表示）のクリックイベントは dashboard_owner.js で登録済みと仮定して、
 // 詳細モーダル表示のための関数を定義します。
 
 async function showDetailModal(userId) {
   try {
     // 新しく用意するバックエンドAPI（Apps Script側）のURL
     // このAPIは、クエリパラメータ user_id を受け取って、詳細情報のJSONを返すものとします。
     const detailUrl = "https://script.googleusercontent.com/macros/echo?user_content_key=YOUR_DETAIL_KEY&lib=YOUR_LIB_ID&type=getUserDetail&user_id=" + encodeURIComponent(userId);
     const response = await fetch(detailUrl);
     const detail = await response.json();
     
     console.log("取得した詳細:", detail);
     
     // モーダルに表示するHTMLを生成
     const modalBody = document.getElementById("modalBody");
     // モーダルの例：基本情報、カテゴリ、エージェント、エージェント履歴など
     // ※ detail.agentHistories は配列、detail.agents もオブジェクト配列で、last_used などが含まれる想定
     let agentHistoryHtml = "";
     if (detail.agentHistories && detail.agentHistories.length > 0) {
       agentHistoryHtml = detail.agentHistories.map(hist => {
         return `<li>${hist.agent_name} – ${hist.used_at} — ${hist.description}</li>`;
       }).join("");
       agentHistoryHtml = `<ul>${agentHistoryHtml}</ul>`;
     }
     
     modalBody.innerHTML = `
       <h2>顧客詳細</h2>
       <p><strong>お客様ID:</strong> ${detail.user.user_id}</p>
       <p><strong>会社名:</strong> ${detail.user.company_name}</p>
       <p><strong>お名前:</strong> ${detail.user.user_name}</p>
       <p><strong>権限:</strong> ${detail.user.role}</p>
       <p><strong>最終ログイン日時:</strong> ${detail.user.last_login}</p>
       <p><strong>電話番号:</strong> ${detail.user.phone || ""}</p>
       <p><strong>メールアドレス:</strong> ${detail.user.email || ""}</p>
       <p><strong>住所:</strong> ${detail.user.address || ""}</p>
       <p><strong>所属カテゴリ:</strong> ${detail.categories.join(", ")}</p>
       <p><strong>利用中エージェント:</strong> ${detail.agents.map(a => a.agent_name + " (最終利用: " + a.last_used + ")").join(", ")}</p>
       <p><strong>エージェント履歴:</strong></p>
       ${agentHistoryHtml}
     `;
     
     // モーダルを表示
     document.getElementById("detailModal").style.display = "block";
     
   } catch (error) {
     console.error("顧客詳細の取得に失敗しました:", error);
     alert("詳細情報の取得に失敗しました。");
   }
 }
 
 // モーダル閉じるイベント
 document.getElementById("modalClose").addEventListener("click", function() {
   document.getElementById("detailModal").style.display = "none";
 });
