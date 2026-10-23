# Spec Delta

## Purpose

Defines how the app selects, persists, and applies coexisting visual themes so semantic design tokens stay consistent across UI while theme families can evolve independently.

## ADDED Requirements

### Requirement: Theme identity on the document
The system SHALL apply the active theme by setting `data-theme` on the document root to exactly one of: `default`, `dark`, or `modern`.

#### Scenario: Modern theme applied
- **WHEN** the user selects the Modern theme
- **THEN** the document root `data-theme` attribute equals `modern`

#### Scenario: Notion light applied
- **WHEN** the user selects the Notion light theme
- **THEN** the document root `data-theme` attribute equals `default`

#### Scenario: Notion dark applied
- **WHEN** the user selects the Notion dark theme
- **THEN** the document root `data-theme` attribute equals `dark`

### Requirement: Theme preference persistence
The system SHALL persist the selected theme identity across sessions and restore it before first paint when a stored value is available.

#### Scenario: Restore stored theme on load
- **WHEN** a previous session stored theme identity `modern`
- **THEN** on subsequent load the document root uses `data-theme="modern"` without requiring the user to select again

#### Scenario: Invalid stored value ignored
- **WHEN** storage contains a theme identity the system does not recognize
- **THEN** the system falls back to the same default resolution used when no preference is stored

### Requirement: Coexisting Modern light tokens
The system SHALL provide a Modern light theme that defines the same semantic token names as the Notion themes, with values that present a minimal contemporary light appearance, without removing or renaming the existing Notion light or dark theme tokens.

#### Scenario: Switch from Notion light to Modern
- **WHEN** the active theme changes from `default` to `modern`
- **THEN** surfaces that use semantic token utilities (for example page background, primary text, button fill, border, radius) reflect Modern token values without requiring component class recipe changes

#### Scenario: Notion themes remain available
- **WHEN** the user selects `default` or `dark` after using Modern
- **THEN** Notion theme tokens apply as before this change

### Requirement: Light/dark toggle unavailable on Modern
While Modern has no dark counterpart, the system SHALL NOT offer a light/dark toggle that switches away from Modern into a Notion dark theme. The control MUST be hidden or disabled when Modern is active.

#### Scenario: Moon control hidden or disabled on Modern
- **WHEN** the active theme is `modern` and the UI exposes a light/dark toggle
- **THEN** that toggle is hidden or disabled so activating it cannot change `data-theme` to `dark`

#### Scenario: Light/dark toggle works on Notion themes
- **WHEN** the active theme is `default` or `dark`
- **THEN** the light/dark toggle switches between `default` and `dark`

### Requirement: Theme family selection
The system SHALL provide a control that lets the user choose between the Notion theme family and the Modern theme family.

#### Scenario: Select Modern family
- **WHEN** the user chooses Modern from the family control
- **THEN** the active theme becomes `modern`

#### Scenario: Select Notion family from Modern
- **WHEN** the active theme is `modern` and the user chooses Notion from the family control
- **THEN** the active theme becomes `default` (Notion light)
