<section class="language-markup">

# How to use

Use the `data-src` and `data-download-link` attribute on a `<pre>` elements similar to [Autoloader](/autoloader), like so:

```html
<pre data-src="myfile.js" data-download-link></pre>
```

Optionally, the text of the button can also be customized by using a `data-download-link-label` attribute.

```html
<pre data-src="myfile.js" data-download-link data-download-link-label="Download this file"></pre>
```

</section>

<section>

# Examples

The plugin’s JS code:
<pre data-src="/download-button/prism-download-button.js" data-download-link data-download-link-label="Download the code!"></pre>

This page:
<pre data-src="/download-button/index.html" data-download-link></pre>
</section>
