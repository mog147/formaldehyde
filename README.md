# FORMALDEHYDE — Specimen Archive

手塚桃子の標本アーカイブ。鉛筆、水彩による作品群。

---

## 作品を追加する

### 1. 画像を追加

`img/gallery/` に画像を2枚置く。

```
img/gallery/
  pencil_16_1.jpg   ← メイン画像（一覧・詳細ページに表示）
  pencil_16_2.JPG   ← 制作過程画像（スライダーの2枚目）
```

ファイル名の形式は自由だが、セットで管理しやすいよう `名前_番号_1.拡張子` / `名前_番号_2.拡張子` を推奨。

### 2. `data/specimens.json` にエントリを追加

ファイル末尾の `]` の直前に追記する。

```json
  {
    "id": "016",
    "title": "作品タイトル（英語）",
    "medium": "pencil / kent paper",
    "year": "2025",
    "img1": "pencil_16_1.jpg",
    "img2": "pencil_16_2.JPG",
    "body": {
      "制作背景": [
        "段落1のテキスト。",
        "段落2のテキスト。"
      ],
      "プロセス": [
        "段落1のテキスト。"
      ],
      "振り返り": [
        "段落1のテキスト。"
      ]
    }
  }
```

**フィールド一覧**

| フィールド | 内容 |
|---|---|
| `id` | 3桁の番号（例: `"016"`）。URLになる (`case/016.html`) |
| `title` | 作品タイトル |
| `medium` | 素材（例: `"pencil / kent paper"`, `"watercolor / watercolor paper"`） |
| `year` | 制作年 |
| `img1` | メイン画像のファイル名 |
| `img2` | 制作過程画像のファイル名 |
| `body` | 各セクションのテキスト。段落ごとに配列で記述 |

### 3. push する

```bash
git add img/gallery/pencil_16_1.jpg img/gallery/pencil_16_2.JPG
git add data/specimens.json
git commit -m "add No.016"
git push
```

push すると GitHub Actions が自動で `index.html` と `case/016.html` を生成・コミットする。1〜2分後に GitHub Pages へ反映される。

---

## ローカルで確認したいとき

```bash
node generate.js
```

`index.html` と `case/*.html` がその場で更新される。ブラウザで `index.html` を開いて確認できる。

---

## ファイル構成

```
formaldehyde/
  data/
    specimens.json      ← 作品データ（ここだけ編集すればOK）
  img/
    gallery/            ← 画像ファイルを置く場所
  case/                 ← 自動生成（直接編集しない）
  index.html            ← 自動生成（直接編集しない）
  generate.js           ← 生成スクリプト
  css/main.css
  js/main.js
  about.html
```
