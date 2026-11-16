# Vymo iOS React Native assignment

This app implements a responsive lead capture form with a small design and a config driven form. It is built with React Native + TypeScript and runs in the iOS simulator.

## Install and run

1. Install dependencies:

```sh
npm install
```

2. Start Metro:

```sh
npm start
```

3. Launch iOS simulator:

```sh
npm run ios
```

If this is the first time using CocoaPods for the project, install the native dependencies:

```sh
bundle install
bundle exec pod install
```

## Folder layout

- `src/design/` contains tokens and atoms used across the app.
- `src/design/Field.tsx` holds the field molecule for label, control, hint, and error.
- `src/lead/` holds the lead feature config, validation rules, and screen.
- `App.tsx` boots the form.

## Where the pieces live

- Tokens: `src/design/tokens.ts`
- Atoms: `src/design/atoms/`
- Field molecule: `src/design/Field.tsx`
- Config: `src/lead/config.ts`
- Validation rules: `src/lead/validation.ts`
- Screen: `src/lead/LeadCaptureScreen.tsx`

## Compact and regular layouts

- The responsive layout switches to one column on narrow iPhone-sized widths and two columns on wider layouts.
- `LeadCaptureScreen.tsx` owns the compact and regular-width layout decisions.
- The screen uses safe-area aware spacing and keyboard avoidance to keep the focused field above the keyboard.

## Notes

- The form renders from a config array; each field maps to a field type and shared atom.
- Validation is kept in a pure validation module that accepts the config and current values.
- The atoms remain generic and do not know about lead-specific rules.
