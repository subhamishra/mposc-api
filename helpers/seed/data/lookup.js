const Data = [
  {
    displayValue: 'Quiz',
    customValue: null,
    customStringValue: null,
    sortOrder: null,
    scopeId: null,
  },
  {
    displayValue: 'Video',
    customValue: null,
    customStringValue: null,
    sortOrder: null,
    scopeId: null,
  },
  {
    displayValue: 'Cart',
    customValue: null,
    customStringValue: null,
    sortOrder: null,
    scopeId: null,
  },
]

const ItemsData = {
  lookupType: {
    lookupType: "RedeemableItemsType",
    description: "This is used for app user activity. e.g. redeeming points, receiving points",
  },
  lookups: [
    {
        displayValue: "Stroller",
        customValue: null,
        customStringValue: {
          "ImagePath": "Stroller.png",
          "Description": "Test",
        },
        points: "1500",
    },
    {
        displayValue: "Exersaucer",
        customValue: null,
        customStringValue: {
          "ImagePath": "Exersaucer.png",
          "Description": "Test"
        },
        points: "1000",
        
    },
    {
        displayValue: "High Chair",
        customValue: null,
        customStringValue: {
          "ImagePath": "HighChair.png",
          "Description": "Test",
        },
        points: "800",
    },
    {
        displayValue: "Car seat",
        customValue: null,
        customStringValue: {
          "ImagePath": "Carseat.png",
          "Description": "Test",
        },
        points: "800",
    },
    {
        displayValue: "Bouncy seat",
        customValue: null,
        customStringValue: {
          "ImagePath": "Bouncyseat.png",
          "Description": "Test",
        },
        points: "600",
    },
    {
        displayValue: "Swing",
        customValue: null,
        customStringValue: {
          "ImagePath": "Swing.png",
          "Description": "Test",
        },
        points: "600",
    },
    {
        displayValue: "Baby activity Mat",
        customValue: null,
        customStringValue: {
          "ImagePath": "BabyactivityMat.png",
          "Description": "Test",
        },
        points: "600",
    },
    {
        displayValue: "Baby monitor",
        customValue: null,
        customStringValue: {
          "ImagePath": "Babymonitor.png",
          "Description": "Test",
        },
        points: "400",
    },
    {
        displayValue: "Diaper Bag",
        customStringValue: {
          "ImagePath": "DiaperBag.png",
          "Description": "Test",
        },
        points: "300",
    },
    {
        displayValue: "Digital Thermometer",
        customValue: null,
        customStringValue: {
          "ImagePath": "DigitalThermometer.png",
          "Description": "Test",
        },
        points: "300",
    },
    {
        displayValue: "Diapers",
        customValue: null,
        customStringValue: {
          "ImagePath": "Diapers.png",
          "Description": "Test",
        },
        points: "200",
    },
    {
        displayValue: "Bath tub",
        customValue: null,
        customStringValue: {
          "ImagePath": "Bathtub.png",
          "Description": "Test",
        },
        points: "200",
    },
    {
        displayValue: "Baby Proofing kit",
        customValue: null,
        customStringValue: {
          "ImagePath": "BabyProofingkit.png",
          "Description": "Test",
        },
        points: "200",
    },
    {
        displayValue: "Outfits/onesies",
        customValue: null,
        customStringValue: {
          "ImagePath": "Outfits_onesies.png",
          "Description": "Test",
        },
        points: "100",
    },
    {
        displayValue: "Wipes",
        customValue: null,
        customStringValue: {
          "ImagePath": "Wipes.png",
          "Description": "Test",
        },
        points: "100",
    },
    {
        displayValue: "Bottles/brush",
        customValue: null,
        customStringValue: {
          "ImagePath": "Bottles_brush.png",
          "Description": "Test",
        },
        points: "100",
    },
    {
        displayValue: "Baby books/toys.png",
        customValue: null,
        customStringValue: {
          "ImagePath": "Babybooks_toys.png",
          "Description": "Test",
        },
        points: "100",
    },
    {
        displayValue: "Memory book",
        customValue: null,
        customStringValue: {
          "ImagePath": "Memorybook.png",
          "Description": "Test",
        },
        points: "100",
    },
    {
        displayValue: "Mittens/hats/socks",
        customValue: null,
        customStringValue: {
          "ImagePath": "Mittens_hats_socks.png",
          "Description": "Test",
        },
        points: "100",
    },
    {
        displayValue: "Baby bath products",
        customValue: null,
        customStringValue: {
          "ImagePath": "Babybathproducts.png",
          "Description": "Test",
        },
        points: "100",
    },
    {
        displayValue: "Blankets",
        customValue: null,
        customStringValue: {
          "ImagePath": "Blankets.png",
          "Description": "Test",
        },
        points: "50",
    },
    {
        displayValue: "Hooded towel",
        customValue: null,
        customStringValue: {
          "ImagePath": "Hoodedtowel.png",
          "Description": "Test",
        },
        points: "50",
    },
    {
        displayValue: "Wash cloths",
        customValue: null,
        customStringValue: {
          "ImagePath": "Washcloths.png",
          "Description": "Test",
        },
        points: "50",
    },
    {
        displayValue: "Bibs",
        customValue: null,
        customStringValue: {
          "ImagePath": "Bibs.png",
          "Description": "Test",
        },
        points: "50",
    },
    {
        displayValue: "2 pack pacifiers.",
        customValue: null,
        customStringValue: {
          "ImagePath": "2packpacifiers.png",
          "Description": "Test",
        },
        points: "50",
    },
    {
        displayValue: "Infant spoons",
        customValue: null,
        customStringValue: {
          "ImagePath": "Infantspoons.png",
          "Description": "Test",
        },
        points: "50",
    },
    {
        displayValue: "Infant bowls",
        customValue: null,
        customStringValue: {
          "ImagePath": "Infantbowls.png",
          "Description": "Test",
        },
        points: "50",
    }
  ]
}

const LookupType = {
  lookupType: "AppUserActivityType",
  description: "This is used for app user activity. e.g. redeeming points, receiving points",
}

module.exports = {
  Data: Data,
  LookupType: LookupType,
}