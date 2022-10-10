# js-mc-menu - simple jQuery mobile menu

## Description

Simple jQuery hamburger menu for small screens,
in case you don't want or can't to use CSS solution.

## Browser support

Internet Explorer 8 and (almost) anything newer ;)

## Options

Name        | Type       | Default    | Description
:---------- | :--------- | :--------- | :-----------
width       | int        | null       | max width for collapse mode
button      | string     | null       | custom menu opener
buttonActive| string     | active     | class for button when menu is open
clickable   | bool       | false      | disable link on opening button
list        | string     | ul         | menu body element
subMenu     | string     | null       | optional expandable submenu

## Usage

```javascript
$("#target").mcMenu({});
```