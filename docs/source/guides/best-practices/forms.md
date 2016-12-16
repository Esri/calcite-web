---
title: Forms Best Practices
description: Guidelines for great design decisions.
layout: layouts/_designguide:text
---

# Forms Best Practices

Forms are an integral part of designing for the web. Making your forms functional, accessible, and beautiful will help the people using your software to be more productive.

Forms have been around since the web 1.0 days, but it's still surprising how many developers use form elements incorrectly or in ways that slow down users. This guide when used with the [forms documentation](../documentation/components/#form-overview) will help you design great forms.

## Forms should be one column

![](../../../assets/img/docs/forms-one-column.svg)

While not a hard and fast rule, [several](http://baymard.com/blog/avoid-multi-column-forms) [studies](https://www.nngroup.com/articles/web-form-design/) have shown that users complete forms faster when they are single column.

## Top align labels

![](../../../assets/img/docs/forms-top-align.svg)

Placing a label above an input field works better in most cases, because users aren’t forced to look separately at the label and the input field. Placing labels above inputs and form fields [reduces completion time](http://www.uxmatters.com/mt/archives/2006/07/label-placement-in-forms.php) for filling out forms.

## Don't use placeholder text as a label

![](../../../assets/img/docs/forms-placeholder.svg)

Never use only placeholder text as a label if you can possibly avoid it. That's not what placeholder text is for. The [HTML5 spec](https://www.w3.org/TR/html5/forms.html#the-placeholder-attribute) specifically advises against this because it creates a couple problems:

1. Placeholder text disappears as soon as the user starts typing. This makes it hard to go back to a previously completed form, or to revise a field you already filled out.
2. Screen reader support for placeholder text is inconsistent.

The only exception to this might be a search form with *one* input. If there is a visual affordance like a search icon and you add an `aria-label`, users will most likely understand the purpose of the input.

## Put text inputs inside labels

```
<label>
  Email
  <input type="text" placeholder="name@example.com">
</label>
```

This is not the only way to accomplish proper labels, but it's the easiest, and it's the way we structure labels in Cacite Web.

This approach is good for a few reasons:

1. Accessible for screen readers by default
2. Easier to type, no `for` or `id` attributes needed
3. You get Calcite Web's vertical spacing for free

We recommend putting inputs inside labels because it makes it easier, but whether you use this method or the more traditional `for` and `id` attributes, it is very important to link labels and inputs together.

# Group related information

![](../../../assets/img/docs/forms-group.svg)

If you have a long form with lots of fields, it's important to break it up and organize it for your users. This helps your users focus on smaller, more manageable tasks, increasing conversions and decreasing completion times. You can also [use the `group` role](https://www.w3.org/WAI/tutorials/forms/grouping/#associating-related-controls-with-wai-aria) to help users utilizing screen readers.

# Denote optional fields

![](../../../assets/img/docs/forms-optional.svg)

Denoting optional fields decreases form completion time and is more clear and explicit than marking required fields with an asterisk. Red asterisks also compete visually with error messages (covered below).

# Mark fields as successful

![](../../../assets/img/docs/forms-success.svg)

This is not required, but more of a "nice to have" feature. As users complete a form, use JavaScript to add the `input-success` class to form fields if they are valid. This helps users get feedback on what they've done correctly.

# After submission, clearly indicate errors

![](../../../assets/img/docs/forms-error.svg)

It's very important to show users what went wrong if there are errors processing and validating the form. Errors should be specific, and shown inline with the form field that caused the problem. Use the `input-error` and `input-error-message` classes to indicate the error in the form. Ensure that the error message is helpful and descriptive. For an example of form errors, see the [form validation](../../../documentation/components/#form-validation) section of the Calcite Web documentation.



