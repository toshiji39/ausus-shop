# ausus 中古設備・工事相談サイト

中古設備・未使用パイプ材料・自作品の販売と、工事のご相談窓口を1つにまとめたサイト。GitHub Pages（Jekyll）でホスティングする。

## 商品の追加方法（コードは書かない）

商品は「1点＝1つのテキストファイル」。該当フォルダに新しいファイルを作り、以下の項目を埋めるだけで自動的にサイトに反映される。

- 小物（中古・その場で購入） → `_komono/`
- 大物（中古・お問い合わせ） → `_omono/`
- パイプ材料（未使用・その場で購入） → `_pipe/`
- 自作品（新品・購入 or 相談） → `_jisaku/`

既存のファイル（例: `_komono/angle-l50.md`）をコピーして、中身を書き換えるのが一番早い。

```yaml
---
title: "商品名"
icon: angle              # アイコンの種類。_includes/icon.html にある名前から選ぶ
price: "2,400"           # カンマ区切りの文字列で（¥マークは付けない）
price_note: "税込"
payment_link: "https://buy.stripe.com/xxxx"   # Stripeの決済リンク。未設定なら空文字のままでOK（「準備中」表示になる）
specs:
  - label: "寸法"
    value: "50×50×5mm"
order: 10                # 表示順（小さい数字が先）
---
```

大物・お問い合わせ扱いにしたい商品は、`cta_type: inquiry` と `stock_note: "在庫あり・1台"` を追加する（`_omono/compressor-30hp.md` を参照）。

## 写真・図面PDFの追加方法

1. 写真ファイルを `assets/photos/` に、図面PDFを `assets/drawings/` に置く（GitHub上でドラッグ&ドロップでアップロード可能）
2. 商品のfront matterに以下を追加する

```yaml
photos:
  - "写真1.jpg"
  - "写真2.jpg"
  - "写真3.jpg"
drawing_pdf: "図面.pdf"
```

- `photos` は何枚でも追加できる（1枚だけでもOK）。商品カードの写真部分が横スクロールのギャラリーになり、2枚以上あると枚数が表示される
- `drawing_pdf` を指定すると、商品情報の下に「図面PDFを見る」というリンクが表示される（クリックで新しいタブに開く）
- どちらも省略可能。省略した場合は今まで通りアイコンのプレースホルダー表示になる

**注意: ファイル名の先頭にアンダースコア(`_`)を使わないこと。** Jekyllは`_`で始まるファイルを自動的に除外してしまい、サイトに反映されない（実際にこれで一度ハマった）。

## 準備が必要なもの（ユーザー側の作業）

1. **Stripe決済リンク**: [Stripe](https://stripe.com/jp) でアカウントを作り、商品ごとに決済リンクを発行して `payment_link` に貼る
2. **お問い合わせフォーム**: [Formspree](https://formspree.io) 等でアカウントを作り、発行されたフォームIDを `_data/site_meta.yml` の `inquiry_form_action` に設定する
3. **会社情報**: `_data/site_meta.yml` の特定商取引法表記・古物商許可番号を、取得・確定次第記入する

これらが未設定の間は、サイト上部に「準備中」の通知バーが表示され、購入・問い合わせの送信もブロックされる。

## ローカルプレビュー（要Ruby/Bundler）

```bash
bundle install
bundle exec jekyll serve
```

## 公開

GitHubリポジトリを作成し、Settings → Pages で `main`ブランチ / `/(root)` からの配信を有効化する。
