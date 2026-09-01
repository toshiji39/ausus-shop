---
layout: default
title: ausus 中古設備販売
---

<section class="hero">
  <div class="inner">
    <div>
      <div class="eyebrow">Ausus / 中古設備</div>
      <h1 class="jp-head">現場で役目を終えた設備を、<br>次の現場へつなぐ。</h1>
      <p class="lead">配管工事・機械据付・設備修繕を手がけるaususが、現場で発生した中古設備と未使用の余剰資材を直接販売します。小さな部材はその場でご購入、大型設備は現物を確認しながらお見積りします。</p>
      <div class="hero-ctas">
        <a class="btn btn-solid" href="#komono">即納パーツを見る</a>
        <a class="btn btn-outline" href="#omono">現物商談品を見る</a>
      </div>
    </div>
    <div class="plate hero-plate">
      <div class="rivets"></div>
      <h3>取扱商材</h3>
      <div class="row"><span>即納パーツ（アングル・治具・パイプ等）</span><span class="mono">中古/未使用 · 即購入</span></div>
      <div class="row"><span>現物商談品（コンプレッサー・減速機等）</span><span class="mono">中古 · 見積り</span></div>
      <div class="row"><span>自社製品</span><span class="mono">新品 · 即購入</span></div>
    </div>
  </div>
</section>

<section id="komono">
  <div class="inner">
    <div class="section-head">
      <div>
        <div class="eyebrow">Ready to Ship</div>
        <h2 class="jp-head">即納パーツ</h2>
        <p class="section-desc">鋼材の端材・治具・未使用パイプなど、その場でご購入いただける規格品です。</p>
      </div>
    </div>
    {% include filter-section.html items=site.komono group_id="komono" %}
  </div>
</section>

<section id="omono" style="background:var(--surface-alt); border-top:1px solid var(--line); border-bottom:1px solid var(--line);">
  <div class="inner">
    <div class="section-head">
      <div>
        <div class="eyebrow">One of a Kind</div>
        <h2 class="jp-head">現物商談品</h2>
        <p class="section-desc">重量・搬入経路の確認が必要な、現品1台限りの設備です。在庫は実在します——カート購入ではなく、お問い合わせから現物確認・お見積りに進みます。</p>
      </div>
    </div>
    {% include filter-section.html items=site.omono group_id="omono" %}
  </div>
</section>

<section id="jisaku" style="background:var(--surface-alt); border-top:1px solid var(--line); border-bottom:1px solid var(--line);">
  <div class="inner">
    <div class="section-head">
      <div>
        <div class="eyebrow">Original Products / 新品</div>
        <h2 class="jp-head">自作品</h2>
        <p class="section-desc">aususが自社で製作したオリジナル金具・治具です。すべて新品としての販売になります。</p>
      </div>
    </div>
    <div class="grid">
      {% assign items = site.jisaku | sort: "order" %}
      {% for item in items %}
        {% include card.html item=item %}
      {% endfor %}
    </div>
  </div>
</section>
