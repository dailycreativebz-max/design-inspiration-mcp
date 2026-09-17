#!/usr/bin/env python3
"""Render The Emergency Food Playbook to a U.S. Letter PDF.

Reads ebook/dist/pdf-data.json (produced by ebook/tools/dump-for-pdf.mjs) and
renders every sheet as one print page with reportlab, using the book's design
tokens (ebook/DESIGN.md): Libre Franklin display + Source Serif 4 body,
navy/cream/tomato/amber palette, page chrome with folios.
"""
import json, os, re, sys
from html.parser import HTMLParser

from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import HexColor, white, Color
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_LEFT, TA_RIGHT, TA_CENTER
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Flowable,
                                Paragraph, Spacer, Table, TableStyle, PageBreak,
                                KeepInFrame, NextPageTemplate)
from reportlab.lib.styles import ParagraphStyle

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # ebook/
_repo_fonts = os.path.join(ROOT, "tools", "fonts")
FONTS = _repo_fonts if os.path.isdir(_repo_fonts) else os.path.join(os.path.expanduser("~"), ".qa", "fonts", "ttf")
DATA = os.path.join(ROOT, "dist", "pdf-data.json")
OUT = os.path.join(ROOT, "The-Emergency-Food-Playbook.pdf")

# ── Design tokens ────────────────────────────────────────────────────────────
NAVY = HexColor("#14304F"); NAVY_DEEP = HexColor("#0E2238")
INK = HexColor("#20293A"); CREAM = HexColor("#FAF6EE"); CREAM_DEEP = HexColor("#F3ECDC")
TOMATO = HexColor("#B5402F"); TOMATO_SOFT = HexColor("#F6E7E3")
AMBER = HexColor("#C98A2B"); AMBER_INK = HexColor("#8F5D15")
GRAY = HexColor("#5A6472"); LINE = HexColor("#E3DCCB"); PAPER = white
BLUE = HexColor("#4A7BA6")

PAGE_W, PAGE_H = letter
M_LR, M_TOP, M_BOT = 0.8 * inch, 0.75 * inch, 0.62 * inch
FRAME_W = PAGE_W - 2 * M_LR
FRAME_H = PAGE_H - M_TOP - M_BOT - 0.18 * inch  # leave room for footer rule

def reg(name, fname):
    pdfmetrics.registerFont(TTFont(name, os.path.join(FONTS, fname)))

for n, f in [("Franklin", "libre-franklin-latin-400-normal.ttf"),
             ("Franklin-Bold", "libre-franklin-latin-700-normal.ttf"),
             ("Franklin-Heavy", "libre-franklin-latin-800-normal.ttf"),
             ("Franklin-Black", "libre-franklin-latin-900-normal.ttf"),
             ("Serif", "source-serif-4-latin-400-normal.ttf"),
             ("Serif-Bold", "source-serif-4-latin-700-normal.ttf"),
             ("Serif-Italic", "source-serif-4-latin-400-italic.ttf")]:
    reg(n, f)
registerFontFamily("Franklin", normal="Franklin", bold="Franklin-Bold", italic="Franklin", boldItalic="Franklin-Bold")
registerFontFamily("Serif", normal="Serif", bold="Serif-Bold", italic="Serif-Italic", boldItalic="Serif-Bold")

# ── Styles ───────────────────────────────────────────────────────────────────
S = {}
def st(name, **kw): S[name] = ParagraphStyle(name, **kw)

st("body", fontName="Serif", fontSize=10.2, leading=14.6, textColor=INK, spaceAfter=7)
st("lede", fontName="Serif", fontSize=12.6, leading=17.5, textColor=INK, spaceAfter=10)
st("small", fontName="Serif", fontSize=9.2, leading=13, textColor=INK, spaceAfter=6)
st("fine", fontName="Franklin", fontSize=7.2, leading=9.6, textColor=GRAY, spaceAfter=6)
st("kicker", fontName="Franklin-Heavy", fontSize=8.4, leading=11, textColor=TOMATO, spaceAfter=4)
st("h1", fontName="Franklin-Black", fontSize=30, leading=33, textColor=NAVY, spaceAfter=10)
st("h2", fontName="Franklin-Heavy", fontSize=16.5, leading=19.5, textColor=NAVY, spaceBefore=13, spaceAfter=7)
st("h3", fontName="Franklin-Bold", fontSize=12.6, leading=15.5, textColor=NAVY, spaceBefore=10, spaceAfter=5)
st("h4", fontName="Franklin-Bold", fontSize=11, leading=13.5, textColor=NAVY, spaceBefore=8, spaceAfter=4)
st("li", fontName="Serif", fontSize=10.2, leading=14.2, textColor=INK, leftIndent=13, spaceAfter=3, bulletIndent=2)
st("li-s", fontName="Serif", fontSize=9.2, leading=12.6, textColor=INK, leftIndent=13, spaceAfter=2.5, bulletIndent=2)
st("cell", fontName="Franklin", fontSize=7.7, leading=9.8, textColor=INK)
st("cell-strong", fontName="Franklin-Bold", fontSize=7.7, leading=9.8, textColor=NAVY)
st("th", fontName="Franklin-Bold", fontSize=7.8, leading=10, textColor=CREAM)
st("caption", fontName="Franklin-Heavy", fontSize=8.2, leading=10.5, textColor=NAVY, spaceAfter=3)
st("callout-label", fontName="Franklin-Heavy", fontSize=8, leading=10.5, textColor=NAVY, spaceAfter=3)
st("callout-body", fontName="Serif", fontSize=9.4, leading=13, textColor=INK)
st("banner-label", fontName="Franklin-Heavy", fontSize=8.4, leading=11, textColor=white, spaceAfter=3)
st("banner-body", fontName="Serif", fontSize=9.6, leading=13.2, textColor=HexColor("#FBEFEA"))
st("recipe-name", fontName="Franklin-Heavy", fontSize=10.6, leading=12.5, textColor=NAVY)
st("recipe-meta", fontName="Franklin-Bold", fontSize=6.8, leading=9, textColor=GRAY, alignment=TA_RIGHT)
st("recipe-tag", fontName="Franklin-Bold", fontSize=6.2, leading=8.2, textColor=GRAY)
st("recipe-h5", fontName="Franklin-Heavy", fontSize=6.6, leading=8.6, textColor=TOMATO, spaceAfter=2)
st("recipe-body", fontName="Serif", fontSize=8, leading=10.6, textColor=INK, spaceAfter=3)
st("spec-label", fontName="Franklin-Heavy", fontSize=5.9, leading=7.6, textColor=GRAY)
st("spec-value", fontName="Franklin-Bold", fontSize=7.6, leading=9.4, textColor=NAVY)
st("note", fontName="Franklin", fontSize=6.9, leading=9.2, textColor=GRAY, spaceBefore=4)
st("toc-h", fontName="Franklin-Heavy", fontSize=8, leading=10.5, textColor=TOMATO, spaceBefore=8, spaceAfter=3)
st("toc-row", fontName="Franklin-Bold", fontSize=9, leading=12, textColor=NAVY)
st("formula", fontName="Franklin-Heavy", fontSize=12.5, leading=15, textColor=CREAM)
st("ws-note", fontName="Franklin", fontSize=7, leading=9.4, textColor=GRAY, spaceBefore=4)

def esc(t):
    return t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

def inline(text):
    """text already HTML-escaped with <b>/<i> markup."""
    return text

# ── HTML → flowables converter (book markup subset) ─────────────────────────
VOID = {"br", "img", "hr", "meta", "link", "input"}

class Node:
    __slots__ = ("tag", "attrs", "children", "text")
    def __init__(self, tag, attrs=None):
        self.tag = tag; self.attrs = dict(attrs or {}); self.children = []; self.text = ""

class TreeBuilder(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("root"); self.stack = [self.root]
    def handle_starttag(self, tag, attrs):
        if tag in VOID:
            if tag == "br": self.stack[-1].children.append(Node("br"))
            return
        n = Node(tag, attrs); self.stack[-1].children.append(n); self.stack.append(n)
    def handle_startendtag(self, tag, attrs):
        if tag == "br": self.stack[-1].children.append(Node("br"))
    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]; break
    def handle_data(self, data):
        self.stack[-1].children.append(data)

def parse_html(html):
    tb = TreeBuilder(); tb.feed(html); return tb.root

def cls_of(node, *wanted):
    c = node.attrs.get("class", "")
    return any(w in c.split() or w in c for w in wanted)

def find(node, tag=None, cls=None):
    out = []
    for ch in node.children:
        if isinstance(ch, Node):
            if (tag is None or ch.tag == tag) and (cls is None or cls in ch.attrs.get("class", "")):
                out.append(ch)
            out.extend(find(ch, tag, cls))
    return out

def text_of(node, style_key="body", bold=False, depth=0):
    """Flatten inline content to reportlab markup, honoring strong/em/br."""
    parts = []
    for ch in node.children:
        if isinstance(ch, str):
            t = re.sub(r"\s+", " ", ch)
            if t.strip():
                parts.append(esc(t))
            elif t == " ":
                parts.append(" ")
        elif ch.tag == "br":
            parts.append("<br/>")
        elif ch.tag in ("strong", "b"):
            parts.append("<b>" + text_of(ch, style_key, True, depth) + "</b>")
        elif ch.tag in ("em", "i"):
            parts.append("<i>" + text_of(ch, style_key, bold, depth) + "</i>")
        elif ch.tag == "span":
            parts.append(text_of(ch, style_key, bold, depth))
        elif ch.tag == "a":
            parts.append(text_of(ch, style_key, bold, depth))
        elif ch.tag in ("p", "h1", "h2", "h3", "h4", "h5", "div"):
            parts.append(text_of(ch, style_key, bold, depth) + "<br/>")
        elif ch.tag == "svg":
            continue
        else:
            parts.append(text_of(ch, style_key, bold, depth))
    return "".join(parts)

def paras_from(node, style):
    """Split a container's children into Paragraph flowables per <p>/<li>/text."""
    flows = []
    for ch in node.children:
        if isinstance(ch, str):
            if ch.strip(): flows.append(Paragraph(esc(ch.strip()), style))
        elif isinstance(ch, Node):
            if ch.tag == "p":
                sty = style
                c = ch.attrs.get("class", "")
                if "lede" in c: sty = S["lede"]
                elif "fine" in c: sty = S["fine"]
                elif "small" in c: sty = S["small"]
                flows.append(Paragraph(text_of(ch, "p"), sty))
            elif ch.tag in ("h1", "h2", "h3", "h4"):
                sty = S[ch.tag]
                if ch.tag == "h1": sty = S["h1"]
                flows.append(Paragraph(text_of(ch, ch.tag), sty))
            elif ch.tag in ("ul", "ol"):
                flows.extend(list_flow(ch, style))
            elif ch.tag == "table":
                flows.extend(table_flow(ch))
            elif ch.tag == "div":
                flows.extend(div_flow(ch))
            elif ch.tag == "article":
                flows.extend(article_flow(ch))
            elif ch.tag == "hr":
                flows.append(Spacer(1, 4))
    return flows

def list_flow(node, parent_style):
    flows = []
    small = "small" in node.attrs.get("class", "") or parent_style is S["small"]
    sty = S["li-s"] if small else S["li"]
    ordered = node.tag == "ol"
    i = 0
    for li in node.children:
        if not isinstance(li, Node) or li.tag != "li": continue
        i += 1
        bullet = f"{i}. " if ordered else "•  "
        flows.append(Paragraph(esc(bullet) + text_of(li, "li"), sty))
    return flows

def op_flow(node):
    flows = [Spacer(1, 30)]
    for ch in node.children:
        if not isinstance(ch, Node): continue
        c = ch.attrs.get("class", "")
        if "kicker" in c: flows.append(Paragraph(text_of(ch, "k"), S["kicker"]))
        elif "op__title" in c:
            flows.append(Paragraph(text_of(ch, "t"), ParagraphStyle("op-h1", parent=S["h1"], fontSize=32, leading=35)))
        elif "op__rule" in c:
            rule = Table([[""]], colWidths=[2.8 * inch], rowHeights=[4])
            rule.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), TOMATO)]))
            flows.extend([Spacer(1, 10), rule, Spacer(1, 12)])
        elif "op__dek" in c:
            flows.append(Paragraph(text_of(ch, "d"), ParagraphStyle("op-dek", parent=S["lede"], fontName="Serif-Italic", textColor=GRAY, fontSize=12.2, leading=17)))
    flows.append(Spacer(1, 12))
    return flows

def div_flow(node):
    c = node.attrs.get("class", "")
    if "op" == c.strip() or c.split()[0:1] == ["op"]:
        return op_flow(node)
    if "callout" in c: return [callout_flow(node, c)]
    if "banner" in c: return [banner_flow(node)]
    if "formula" in c: return [formula_flow(node)]
    if "toc" in c: return toc_flow(node)
    if "front" in c or "cols-2" in c or "sheet" in c or "stack" in c:
        return paras_from(node, S["body"])
    if "rule" in c.split():
        return [Spacer(1, 2)]
    return paras_from(node, S["body"])

def callout_flow(node, cls):
    if "callout--safety" in cls: bar, bg = TOMATO, TOMATO_SOFT
    elif "callout--tip" in cls: bar, bg = AMBER, CREAM
    else: bar, bg = GRAY, HexColor("#F4F5F7")
    label = ""; body = []
    for ch in node.children:
        if isinstance(ch, Node) and "callout__label" in ch.attrs.get("class", ""):
            label = text_of(ch, "label")
    for ch in node.children:
        if isinstance(ch, Node) and ch.tag in ("p", "ul", "ol", "table"):
            if ch.tag == "p":
                body.append(Paragraph(text_of(ch, "p"), S["callout-body"]))
            elif ch.tag in ("ul", "ol"):
                for li in find(ch, "li"):
                    body.append(Paragraph("•  " + text_of(li, "li"), ParagraphStyle("cb-li", parent=S["callout-body"], leftIndent=11, bulletIndent=1, spaceAfter=2)))
            else:
                body.extend(table_flow(ch))
    inner = []
    if label:
        lsty = ParagraphStyle("cl", parent=S["callout-label"], textColor=(TOMATO if bar is TOMATO else (AMBER_INK if bar is AMBER else NAVY)))
        inner.append(Paragraph(label, lsty))
    inner.extend(body)
    t = Table([[inner]], colWidths=[FRAME_W - 14])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), bg),
        ("LINEBEFORE", (0, 0), (0, -1), 4, bar),
        ("LEFTPADDING", (0, 0), (-1, -1), 11), ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 8), ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    return KeepInFrame(FRAME_W, FRAME_H / 2, [t], mode="shrink")

def banner_flow(node):
    label = ""; body = []
    for ch in node.children:
        if isinstance(ch, Node) and "callout__label" in ch.attrs.get("class", ""):
            label = text_of(ch, "label")
        elif isinstance(ch, Node) and ch.tag == "p":
            body.append(Paragraph(text_of(ch, "p"), S["banner-body"]))
        elif isinstance(ch, Node) and ch.tag in ("h2", "h3"):
            label = text_of(ch, "label")
    inner = []
    if label: inner.append(Paragraph(label, S["banner-label"]))
    inner.extend(body)
    t = Table([[inner]], colWidths=[FRAME_W - 8])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), TOMATO),
        ("LEFTPADDING", (0, 0), (-1, -1), 12), ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 10), ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
    ]))
    return t

def formula_flow(node):
    segs = []
    for ch in node.children:
        if isinstance(ch, Node) and ch.tag == "span":
            txt = text_of(ch, "f")
            if "plus" in ch.attrs.get("class", ""): segs.append(("plus", "+"))
            elif txt.strip(): segs.append(("term", txt.strip()))
    para = []
    for kind, txt in segs:
        if kind == "plus": para.append('<font color="#C98A2B" size="15">+</font>')
        else: para.append(esc(txt))
    t = Table([[Paragraph("&nbsp;&nbsp;".join(para), S["formula"])]], colWidths=[FRAME_W])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), NAVY),
        ("LEFTPADDING", (0, 0), (-1, -1), 14), ("TOPPADDING", (0, 0), (-1, -1), 11),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 11),
    ]))
    return t

def toc_flow(node):
    flows = []
    for sec in find(node, "div", "toc-section"):
        for ch in sec.children:
            if isinstance(ch, Node) and ch.tag == "h3":
                flows.append(Paragraph(text_of(ch, "h3"), S["toc-h"]))
        rows = []
        for row in find(sec, "div", "toc-row"):
            t = p = ""
            for sp in row.children:
                if not isinstance(sp, Node): continue
                c = sp.attrs.get("class", "")
                if "t" in c.split() or "t\">" in c: t = text_of(sp, "x")
                if "pg" in c: p = text_of(sp, "x")
            rows.append([Paragraph(t, S["toc-row"]), Paragraph(p, ParagraphStyle("tp", parent=S["toc-row"], alignment=TA_RIGHT))])
        if rows:
            tbl = Table(rows, colWidths=[FRAME_W - 60, 44])
            sty = [("LEFTPADDING", (0, 0), (-1, -1), 2), ("RIGHTPADDING", (0, 0), (-1, -1), 2),
                   ("TOPPADDING", (0, 0), (-1, -1), 2.6), ("BOTTOMPADDING", (0, 0), (-1, -1), 2.6),
                   ("VALIGN", (0, 0), (-1, -1), "BASELINE")]
            for i in range(len(rows)):
                sty.append(("LINEBELOW", (0, i), (0, i), 0.5, LINE))
            tbl.setStyle(TableStyle(sty))
            flows.append(tbl)
    return flows

# ── Tables ───────────────────────────────────────────────────────────────────
def table_flow(tnode):
    flows = []
    is_ws = "ws-table" in tnode.attrs.get("class", "")
    cap = find(tnode, "caption")
    if cap:
        flows.append(Paragraph(text_of(cap[0], "c"), S["caption"]))
    header, rows = [], []
    thead = find(tnode, "thead")
    if thead:
        for tr in find(thead[0], "tr"):
            header = [cell_flow(td, True) for td in tr.children if isinstance(td, Node) and td.tag in ("th", "td")]
    tbody = find(tnode, "tbody")
    body_src = tbody[0] if tbody else tnode
    for tr in body_src.children:
        if not (isinstance(tr, Node) and tr.tag == "tr"): continue
        if thead and tr in find(thead[0], "tr"): continue
        cells = [cell_flow(td, False) for td in tr.children if isinstance(td, Node) and td.tag in ("th", "td")]
        if cells: rows.append(cells)
    if not rows and not header: return flows
    ncol = max([len(header)] + [len(r) for r in rows])
    # widen narrow rows
    for r in rows:
        while len(r) < ncol: r.append(Paragraph("", S["cell"]))
    while header and len(header) < ncol: header.append(Paragraph("", S["th"]))
    data = ([header] if header else []) + rows
    tbl = Table(data, repeatRows=1 if header else 0, hAlign="LEFT")
    sty = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5), ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 3.6), ("BOTTOMPADDING", (0, 0), (-1, -1), 3.6),
        ("GRID", (0, 0), (-1, -1), 0.6, LINE),
    ]
    if header:
        sty += [("BACKGROUND", (0, 0), (-1, 0), NAVY), ("GRID", (0, 0), (-1, 0), 0.6, NAVY)]
        first_body = 1
    else:
        first_body = 0
    for i, r in enumerate(rows):
        if i % 2 == 1 and not is_ws:
            sty.append(("BACKGROUND", (0, first_body + i), (-1, first_body + i), CREAM))
    if is_ws:
        for i in range(len(rows)):
            sty.append(("ROWHEIGHT", (0, first_body + i), (-1, first_body + i), 24))
    tbl.setStyle(TableStyle(sty))
    return flows + [tbl, Spacer(1, 6)]

def cell_flow(td, is_head):
    # worksheet checkbox → bordered square
    if find(td, "span", "ws-box"):
        box = Table([[""]], colWidths=[11], rowHeights=[11])
        box.setStyle(TableStyle([("BOX", (0, 0), (-1, -1), 1.1, NAVY)]))
        return box
    sty = S["th"] if is_head else S["cell"]
    parts = []
    for ch in td.children:
        if isinstance(ch, Node) and ch.tag == "span" and "ws-box" in ch.attrs.get("class", ""):
            parts.append('<font color="#14304F">&#9633;</font>')  # open square
        elif isinstance(ch, Node) and ch.tag == "br":
            parts.append("<br/>")
        elif isinstance(ch, Node):
            parts.append(text_of(ch, "cell"))
        elif isinstance(ch, str) and ch.strip():
            parts.append(esc(ch.strip()))
    html = " ".join(p for p in parts if p) or "&nbsp;"
    return Paragraph(html, sty)

# ── Recipe cards ─────────────────────────────────────────────────────────────
CARD_W = FRAME_W / 2 - 34      # card outer width
CARD_IN = CARD_W - 18          # inside padding

def spec_strip(node):
    specs = []
    for sp in find(node, "div", "spec"):
        dt = dd = ""
        for ch in sp.children:
            if isinstance(ch, Node) and ch.tag == "dt": dt = text_of(ch, "d")
            if isinstance(ch, Node) and ch.tag == "dd": dd = text_of(ch, "d")
        dt = re.sub(r"(?i)(method|water|fuel|dishes)", lambda m: m.group(1).upper(), dt)
        specs.append((dt.strip(), dd.strip()))
    cells_l, cells_v = [], []
    data = []
    row1, row2 = [], []
    for dt, dd in specs[:4]:
        row1.append(Paragraph(dt, S["spec-label"]))
        row2.append(Paragraph(dd, S["spec-value"]))
    t = Table([row1, row2], colWidths=[CARD_IN / 4] * 4)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), CREAM),
        ("GRID", (0, 0), (-1, -1), 0.5, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 5), ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ("TOPPADDING", (0, 0), (-1, -1), 3), ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return t

def article_flow(node):
    """Recipe card or playbook card."""
    cls = node.attrs.get("class", "")
    if "recipe--nocook" in cls: top = AMBER
    elif "recipe--hotwater" in cls: top = BLUE
    elif "recipe--onepot" in cls: top = TOMATO
    else: top = NAVY
    name = meta = ""
    tags = ""
    cols = None
    specs = None
    note = ""
    for ch in node.children:
        if not isinstance(ch, Node): continue
        c = ch.attrs.get("class", "")
        if "recipe__head" in c:
            h = find(ch, "h4"); name = text_of(h[0], "n") if h else ""
            s = find(ch, "span", "recipe__serves"); meta = text_of(s[0], "m") if s else ""
        elif "recipe__tags" in c:
            tags = "  ·  ".join(text_of(sp, "t") for sp in find(ch, "span"))
        elif "recipe__cols" in c:
            cols = ch
        elif "recipe__spec" in c:
            specs = ch
        elif "recipe__note" in c:
            note = text_of(ch, "note")
    head = Table([[Paragraph(name, S["recipe-name"]), Paragraph(meta, S["recipe-meta"])]],
                 colWidths=[CARD_IN - 86, 86])
    head.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "BASELINE"),
                              ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                              ("BOTTOMPADDING", (0, 0), (-1, -1), 1)]))
    parts = [head]
    if tags: parts.append(Paragraph(tags, S["recipe-tag"]))
    if cols is not None:
        left, right = [], []
        divs = [d for d in cols.children if isinstance(d, Node) and d.tag == "div"]
        for i, d in enumerate(divs):
            col_flows = []
            for ch in d.children:
                if not isinstance(ch, Node): continue
                if ch.tag == "h5": col_flows.append(Paragraph(text_of(ch, "h"), S["recipe-h5"]))
                elif ch.tag in ("ul", "ol"):
                    for li in find(ch, "li"):
                        b = "•  " if ch.tag == "ul" else ""
                        col_flows.append(Paragraph(b + text_of(li, "li"), S["recipe-body"]))
                elif ch.tag == "p":
                    col_flows.append(Paragraph(text_of(ch, "p"), ParagraphStyle("rcp", parent=S["recipe-body"], fontName="Serif-Italic", textColor=GRAY)))
            (left if i % 2 == 0 else right).extend(col_flows)
        if len(divs) > 1:
            body = Table([[left, right]], colWidths=[CARD_IN / 2 - 5, CARD_IN / 2 - 5])
            body.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"),
                                      ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (0, 0), 8),
                                      ("TOPPADDING", (0, 0), (-1, -1), 1), ("BOTTOMPADDING", (0, 0), (-1, -1), 1)]))
        else:
            body = Table([[left]], colWidths=[CARD_IN])
            body.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 1)]))
        parts.append(body)
    if specs is not None:
        parts.append(spec_strip(specs))
    if note:
        parts.append(Paragraph(note, S["note"]))
    inner = Table([[p] for p in parts], colWidths=[CARD_W])
    inner.setStyle(TableStyle([
        ("LINEABOVE", (0, 0), (-1, 0), 3, top),
        ("BOX", (0, 0), (-1, -1), 0.7, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 9), ("RIGHTPADDING", (0, 0), (-1, -1), 9),
        ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return [inner]

def recipe_grid_flow(node):
    cards = [a for a in node.children if isinstance(a, Node) and a.tag == "article"]
    flows = [Spacer(1, 2)]
    rows = []
    for i in range(0, len(cards), 2):
        pair = [article_flow(c)[0] for c in cards[i:i + 2]]
        if len(pair) == 1: pair.append("")
        rows.append(pair)
    if rows:
        g = Table(rows, colWidths=[FRAME_W / 2 - 8, FRAME_W / 2 - 8])
        g.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"),
                               ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                               ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5)]))
        flows.append(g)
    return flows

# ── Sheet → flowables ────────────────────────────────────────────────────────
def sheet_flows(sheet):
    root = parse_html(sheet["body"])
    flows = []
    for ch in root.children:
        if isinstance(ch, str):
            if ch.strip(): flows.append(Paragraph(esc(ch.strip()), S["body"]))
        elif isinstance(ch, Node):
            c = ch.attrs.get("class", "")
            if ch.tag == "div" and "recipe-grid" in c:
                flows.extend(recipe_grid_flow(ch))
            elif ch.tag == "div":
                flows.extend(div_flow(ch))
            elif ch.tag == "article":
                flows.extend(article_flow(ch))
            elif ch.tag == "table":
                flows.extend(table_flow(ch))
            elif ch.tag in ("h1", "h2", "h3", "h4", "p", "ul", "ol"):
                flows.extend(paras_from(wrap_node(ch), S["body"]))
    return flows

def wrap_node(n):
    w = Node("div"); w.children.append(n); return w

# ── Page chrome ──────────────────────────────────────────────────────────────
BOOK = "The Emergency Food Playbook"; AUTHOR = "Food Opsec"
STATE = {"meta": {}}  # set per page

def chrome(canvas, doc):
    meta = STATE["meta"]
    if meta.get("cover"):
        draw_cover(canvas); return
    canvas.saveState()
    # header
    canvas.setFont("Franklin-Bold", 7.6)
    canvas.setFillColor(GRAY)
    canvas.drawString(M_LR, PAGE_H - 0.42 * inch, BOOK.upper())
    canvas.drawRightString(PAGE_W - M_LR, PAGE_H - 0.42 * inch, meta.get("group", ""))
    canvas.setStrokeColor(LINE); canvas.setLineWidth(0.7)
    canvas.line(M_LR, PAGE_H - 0.48 * inch, PAGE_W - M_LR, PAGE_H - 0.48 * inch)
    # footer
    canvas.line(M_LR, 0.52 * inch, PAGE_W - M_LR, 0.52 * inch)
    canvas.setFont("Franklin-Bold", 7)
    canvas.drawString(M_LR, 0.40 * inch, f"{BOOK} · {AUTHOR}")
    if meta.get("folio"):
        canvas.setFont("Franklin-Heavy", 8.5)
        canvas.setFillColor(NAVY)
        canvas.drawRightString(PAGE_W - M_LR, 0.395 * inch, meta["folio"])
    canvas.restoreState()

def draw_cover(c):
    c.saveState()
    # background
    c.setFillColor(NAVY_DEEP); c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(NAVY); c.rect(0, 0, PAGE_W, PAGE_H * 0.45, fill=1, stroke=0)
    # subtle amber glow top right
    c.setFillColor(Color(0.79, 0.54, 0.17, 0.14))
    c.circle(PAGE_W * 0.92, PAGE_H * 0.94, 150, fill=1, stroke=0)
    L = 0.85 * inch; W = PAGE_W - 2 * L
    y = PAGE_H - 1.05 * inch
    c.setFillColor(AMBER); c.setFont("Franklin-Heavy", 9)
    c.drawString(L, y, "FOOD OPSEC  ·  HOUSEHOLD RESILIENCE SERIES")
    y -= 30
    c.setFillColor(TOMATO); c.rect(L, y, 1.1 * inch, 3.6, fill=1, stroke=0)
    y -= 66
    c.setFillColor(white); c.setFont("Franklin-Black", 51)
    c.drawString(L, y, "THE EMERGENCY")
    y -= 52
    c.drawString(L, y, "FOOD PLAYBOOK")
    y -= 44
    c.setFillColor(HexColor("#D8E0EA")); c.setFont("Serif", 12.4)
    sub = ("30 Days of Affordable, High-Protein Meals for Power Outages, Hurricanes,",
           "Winter Storms and Supply Disruptions — built from ordinary grocery-store",
           "food, not survival buckets.")
    for ln in sub:
        c.drawString(L, y, ln); y -= 17
    y -= 22
    # stat grid
    stats = [("70", "shelf-stable recipes with water and fuel counts"),
             ("30 days", "menu system with rotation built in"),
             ("10", "disaster-specific playbooks"),
             ("$0 panic", "calm, sourced, budget-first planning")]
    bw = (W - 3 * 9) / 4
    for i, (b, t) in enumerate(stats):
        x = L + i * (bw + 9)
        c.setStrokeColor(Color(0.98, 0.96, 0.93, 0.28)); c.setLineWidth(0.8)
        c.rect(x, y - 58, bw, 62, fill=0, stroke=1)
        c.setFillColor(white); c.setFont("Franklin-Heavy", 13)
        c.drawString(x + 9, y - 16, b)
        c.setFillColor(HexColor("#E8E0D0")); c.setFont("Franklin", 7)
        words = t.split()
        line = ""; ly = y - 31
        for w in words:
            if c.stringWidth(line + " " + w, "Franklin", 7) > bw - 18:
                c.drawString(x + 9, ly, line); ly -= 9.5; line = w
            else:
                line = (line + " " + w).strip()
        if line: c.drawString(x + 9, ly, line)
    # footer
    y0 = 0.95 * inch
    c.setStrokeColor(Color(0.98, 0.96, 0.93, 0.3)); c.setLineWidth(0.8)
    c.line(L, y0 + 34, PAGE_W - L, y0 + 34)
    c.setFillColor(AMBER); c.setFont("Franklin-Heavy", 7.6)
    c.drawString(L, y0 + 14, "AUTHOR")
    c.setFillColor(white); c.setFont("Franklin-Heavy", 20)
    c.drawString(L, y0 - 8, AUTHOR)
    c.setFillColor(HexColor("#B9C6D6")); c.setFont("Franklin", 7)
    c.drawRightString(PAGE_W - L, y0, "U.S. EDITION  ·  LETTER SIZE")
    c.restoreState()

# ── Build ────────────────────────────────────────────────────────────────────
def main():
    data = json.load(open(DATA))
    sheets = data["sheets"]

    doc = BaseDocTemplate(OUT, pagesize=letter,
                          title=data["bookTitle"], author=data["author"],
                          subject="Emergency food planning for U.S. households",
                          leftMargin=M_LR, rightMargin=M_LR, topMargin=M_TOP, bottomMargin=M_BOT)
    frame = Frame(M_LR, M_BOT, FRAME_W, FRAME_H, id="page",
                  leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)

    story = []
    metas = []
    for i, sh in enumerate(sheets):
        if sh["cls"] == "cover":
            flows = [Spacer(1, 1)]
        else:
            flows = sheet_flows(sh)
            if not flows: flows = [Spacer(1, 1)]
        story.append(KeepInFrame(FRAME_W, FRAME_H, flows, mode="shrink", name=f"sh{i}"))
        metas.append({"cover": sh["cls"] == "cover", "group": sh["group"], "folio": sh["folio"]})
        if i < len(sheets) - 1:
            story.append(PageBreak())

    page_state = {"idx": -1}
    def chrome_dispatch(canvas, doc):
        page_state["idx"] += 1
        m = metas[page_state["idx"]] if page_state["idx"] < len(metas) else {"cover": False, "group": "", "folio": ""}
        STATE["meta"] = m
        chrome(canvas, doc)
    doc.addPageTemplates([PageTemplate(id="book", frames=[frame], onPage=chrome_dispatch)])
    doc.build(story)
    print("PDF written:", OUT, os.path.getsize(OUT), "bytes")

if __name__ == "__main__":
    main()
