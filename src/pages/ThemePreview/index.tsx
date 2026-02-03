import { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';

const colorSchemes = [
  {
    name: 'Bright & Playful',
    description: 'Cheerful and inviting with warm coral tones',
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    accent: '#FFE66D',
    background: '#FFF9F0',
  },
  {
    name: 'Modern & Bold',
    description: 'Striking contrast with vibrant energy',
    primary: '#E91E63',
    secondary: '#1A237E',
    accent: '#76FF03',
    background: '#FAFAFA',
  },
  {
    name: 'Warm & Energetic',
    description: 'Sunset-inspired warmth and enthusiasm',
    primary: '#FF5722',
    secondary: '#FF9800',
    accent: '#FFC107',
    background: '#FFF8E1',
  },
  {
    name: 'Cool & Fresh',
    description: 'Refreshing ocean vibes and clarity',
    primary: '#00BCD4',
    secondary: '#26A69A',
    accent: '#B2FF59',
    background: '#E0F7FA',
  },
] as const;

const fontStacks = [
  {
    name: 'Rounded & Friendly',
    heading: 'Nunito',
    headingWeight: 700,
    body: 'Nunito',
    bodyWeight: 400,
  },
  {
    name: 'Clean & Modern',
    heading: 'Inter',
    headingWeight: 600,
    body: 'Inter',
    bodyWeight: 400,
  },
  {
    name: 'Quirky & Fun',
    heading: 'Fredoka',
    headingWeight: 600,
    body: 'Quicksand',
    bodyWeight: 400,
  },
] as const;

type ColorScheme = (typeof colorSchemes)[number];
type FontStack = (typeof fontStacks)[number];

function ColorSchemeCard({ scheme }: { scheme: ColorScheme }) {
  return (
    <div
      className="rounded-2xl p-5 shadow-lg transition-transform hover:scale-[1.02]"
      style={{ backgroundColor: scheme.background }}
    >
      <h3
        className="text-lg font-semibold mb-1"
        style={{ color: scheme.primary }}
      >
        {scheme.name}
      </h3>
      <p className="text-sm text-gray-600 mb-4">{scheme.description}</p>

      {/* Color swatches */}
      <div className="flex gap-2 mb-4">
        <div
          className="w-10 h-10 rounded-lg shadow-inner"
          style={{ backgroundColor: scheme.primary }}
          title="Primary"
        />
        <div
          className="w-10 h-10 rounded-lg shadow-inner"
          style={{ backgroundColor: scheme.secondary }}
          title="Secondary"
        />
        <div
          className="w-10 h-10 rounded-lg shadow-inner border border-gray-200"
          style={{ backgroundColor: scheme.accent }}
          title="Accent"
        />
      </div>

      {/* Sample buttons */}
      <div className="flex gap-2 mb-4">
        <button
          className="px-4 py-2 rounded-lg text-white text-sm font-medium shadow-md transition-all hover:brightness-110"
          style={{ backgroundColor: scheme.primary }}
        >
          Primary
        </button>
        <button
          className="px-4 py-2 rounded-lg text-white text-sm font-medium shadow-md transition-all hover:brightness-110"
          style={{ backgroundColor: scheme.secondary }}
        >
          Secondary
        </button>
      </div>

      {/* Sample food card */}
      <div className="bg-white rounded-xl p-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${scheme.primary}20` }}
          >
            🍕
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-800">Leftover Pizza</div>
            <div className="text-xs text-gray-500">2 slices remaining</div>
          </div>
          <span
            className="px-2 py-1 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: scheme.accent, color: scheme.secondary }}
          >
            Fresh
          </span>
        </div>
      </div>
    </div>
  );
}

function FontSampleCard({ font }: { font: FontStack }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-lg">
      <div className="text-xs text-gray-400 uppercase tracking-wide mb-3">
        {font.name}
      </div>

      <h1
        className="text-2xl mb-2 text-gray-800"
        style={{ fontFamily: font.heading, fontWeight: font.headingWeight }}
      >
        What's for dinner?
      </h1>

      <h2
        className="text-lg mb-3 text-gray-600"
        style={{ fontFamily: font.heading, fontWeight: font.headingWeight - 100 }}
      >
        Quick meals under 15 minutes
      </h2>

      <p
        className="text-sm text-gray-500 mb-4 leading-relaxed"
        style={{ fontFamily: font.body, fontWeight: font.bodyWeight }}
      >
        Browse your inventory and find the perfect recipe for tonight. Fresh
        ingredients make the best meals!
      </p>

      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm"
          style={{ fontFamily: font.body, fontWeight: 500 }}
        >
          Get Started
        </button>
        <button
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm"
          style={{ fontFamily: font.body, fontWeight: 500 }}
        >
          Learn More
        </button>
      </div>
    </div>
  );
}

function MixMatchPreview({
  scheme,
  font,
}: {
  scheme: ColorScheme;
  font: FontStack;
}) {
  return (
    <div
      className="rounded-2xl p-6 shadow-xl"
      style={{ backgroundColor: scheme.background }}
    >
      <h1
        className="text-3xl mb-2"
        style={{
          fontFamily: font.heading,
          fontWeight: font.headingWeight,
          color: scheme.primary,
        }}
      >
        What's for dinner?
      </h1>

      <p
        className="mb-6"
        style={{
          fontFamily: font.body,
          fontWeight: font.bodyWeight,
          color: scheme.secondary,
        }}
      >
        Your personalized meal planning experience
      </p>

      {/* Sample food cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {['🍕 Pizza', '🥗 Salad', '🍜 Noodles', '🌮 Tacos'].map((item) => (
          <div
            key={item}
            className="bg-white/80 rounded-xl p-3 shadow-sm backdrop-blur"
          >
            <span
              className="text-sm font-medium"
              style={{ fontFamily: font.body, color: scheme.secondary }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          className="flex-1 py-3 rounded-xl text-white font-medium shadow-lg transition-all hover:brightness-110"
          style={{
            backgroundColor: scheme.primary,
            fontFamily: font.body,
          }}
        >
          Browse Recipes
        </button>
        <button
          className="flex-1 py-3 rounded-xl text-white font-medium shadow-lg transition-all hover:brightness-110"
          style={{
            backgroundColor: scheme.secondary,
            fontFamily: font.body,
          }}
        >
          View Inventory
        </button>
      </div>

      {/* Accent badge */}
      <div className="mt-4 flex justify-center">
        <span
          className="px-4 py-1 rounded-full text-sm font-medium"
          style={{
            backgroundColor: scheme.accent,
            color: scheme.secondary,
            fontFamily: font.body,
          }}
        >
          4 items expiring soon
        </span>
      </div>
    </div>
  );
}

export function ThemePreview() {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedFontIndex, setSelectedFontIndex] = useState(0);

  const selectedColor = colorSchemes[selectedColorIndex];
  const selectedFont = fontStacks[selectedFontIndex];

  return (
    <div className="pb-8">
      <PageHeader title="Theme Preview" showBackButton />

      {/* Color Schemes Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Color Schemes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {colorSchemes.map((scheme) => (
            <ColorSchemeCard key={scheme.name} scheme={scheme} />
          ))}
        </div>
      </section>

      {/* Font Styles Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Font Styles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {fontStacks.map((font) => (
            <FontSampleCard key={font.name} font={font} />
          ))}
        </div>
      </section>

      {/* Mix & Match Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Mix & Match
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Selection controls */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Choose Color Scheme
              </label>
              <div className="grid grid-cols-2 gap-2">
                {colorSchemes.map((scheme, index) => (
                  <button
                    key={scheme.name}
                    onClick={() => setSelectedColorIndex(index)}
                    className={`p-3 rounded-xl text-left transition-all ${
                      selectedColorIndex === index
                        ? 'ring-2 ring-offset-2 ring-gray-800 shadow-lg'
                        : 'hover:shadow-md'
                    }`}
                    style={{ backgroundColor: scheme.background }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: scheme.primary }}
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {scheme.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Choose Font Style
              </label>
              <div className="grid grid-cols-1 gap-2">
                {fontStacks.map((font, index) => (
                  <button
                    key={font.name}
                    onClick={() => setSelectedFontIndex(index)}
                    className={`p-3 rounded-xl text-left bg-white transition-all ${
                      selectedFontIndex === index
                        ? 'ring-2 ring-offset-2 ring-gray-800 shadow-lg'
                        : 'hover:shadow-md'
                    }`}
                  >
                    <span
                      className="text-sm font-medium text-gray-700"
                      style={{ fontFamily: font.heading }}
                    >
                      {font.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live preview */}
          <MixMatchPreview scheme={selectedColor} font={selectedFont} />
        </div>
      </section>
    </div>
  );
}
