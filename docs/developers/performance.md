title: Performance
description: Performance considerations for JagTag-JS
path: tree/master/docs/developers
source: performance.md

# Perfomance considerations

JagTag-JS is built to work as efficiently as possible while maintaining minimal dependency size. As such, JagTag-JS does not incoporate performance optimising modules or replacements for native methods that are allegedly more performant.

Naturally, performance has been considered during development. However, due to developer convenience and language limitations, some concepts sacrifice performance for understandability. This document intends to alleviate your performance concerns if any.

## Synchronous API

You may ask yourself why the API of JagTag-JS is synchronous. Won't this lead to thread blocking issues?

The answer is: **No.** No material ones. JagTag-JS only performs very primitive JavaScript operations such as processing strings, which does not incur large performance hits in the first place.

As such, the common execution time for a single tag (In an isolated environment) is **<= 2 milliseconds**. This number does not change notably until very high amounts of tags are present in a single string. The number does also not change notably when nesting tags. So there is no real need to worry about performance.

## Tag quantities

While JagTag-JS can theoretically support infinite amounts of tags and parsing is normally very fast, parsing speed is still adversely proportional to the amount of tags. As such, and also for good measure, it may be a wise idea to limit the number of tags that can be parsed at once to a sensible number. For instance [Spectra](https://github.com/jagrosh/Spectra) caps out at 200 tags.

This module uses the [matchRecursive](http://xregexp.com/api/#matchRecursive) plugin from [XRegExp](http://xregexp.com) for properly detecting tag boundaries even when they are nested. It's recommended to use it to gather data on how many tags are in a single string and throttling the amounts appropriately.

## Nested tags

In order to support nested tags, JagTag-JS draws inspiration from the [PEMDAS](http://www.purplemath.com/modules/orderops.htm) principle in arithmetics. In practice, this means that tags are parsed from the deepest level upwards.

Consider for instance the **{upper:{lower:{upper:test}}}** tag. The result of the first tag will depend on the next, the result of which will depend on the one after that. This pattern can theoretically[^1] continue ad infinitum.

Due to this, upon parsing a tag, JagTag-JS will look for nested tags and recursively run the parser until it finds a point where there are no further tags. It will leave previous parse operations waiting until the scan is complete and the deepest level has been found.

At this point, the parser will proceed to parsing the tags one by one from the deepest level and going up from there until it reaches the root tag. Now the parsed tag can be returned and the parser can proceed to the next tag.

This does not incur a materially higher performance hit compared to multiple one-level tags in a single string. While the statements outlined in the first section hold true, it may still be a wise idea to limit the amount of tags that can be nested for good measure.

[^1]: See [Tag quantities](#tag-quantities).
