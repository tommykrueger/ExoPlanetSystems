var solarsystem = {
	name: 'Solarsystem',
	radius: 100000,
	stars: [
		{
			name: 'Sun',
			type: 'star',
			radius: 1,
			spec: 'G',
			temp: 5777,
			minhz: 0.95,
			maxhz: 1.67,
			rotationPeriod: 24.47,
			texture: 'sun.png',
		}
	],
	satellites: [
		{ // finish
			name: 'Mercury',
			type: 'planet',
			radius: 2439.7,
			//position: [750, 0, 0],

			semiMajorAxis: 57909100,
			eccentricity: 0.2056,
			inclination: 7.00,
			siderealOrbitPeriod: 87.969,
			rotationPeriod: 0,
			longitudeAscendingNode: 48.331,

			temp: 440,
			masse: 0.055,
			habitable: 0,
			esi: 0.596,
			habitableMoon: 0,
			method: 'observation',
			year: '1400 BC',

			texture: 'mercury.jpg',
		},
		{ // finish
			name: 'Venus',
			type: 'planet',
			radius: 6051.8,
			//position: [750, 0, 0],

			semiMajorAxis: 108208000,
			eccentricity: 0.0068,
			inclination: 3.395,
			siderealOrbitPeriod: 224.701,
			rotationPeriod: 243.0185,
			rotationClockwise: false,
			longitudeAscendingNode: 76.678,

			temp: 737,
			masse: 0.815,
			habitable: 0,
			esi: 0.444,
			habitableMoon: 0,
			method: 'observation',
			year: '1645 BC',

			orbitSpeed: 360,
			texture: 'venus.jpg',
		},
		{ // finish
			name: 'Earth',
			type: 'planet',
			radius: 6371,
			position: [1000, 0, 0],
			rotationSpeed: 1,

			// in km (proximation)
			semiMajorAxis: 149600000,
			eccentricity: 0.0167,

			// in earth days
			siderealOrbitPeriod: 365.256,

			// degrees
			inclination: 0.0,

			// in hours min sec
			rotationPeriod: 1,

			temp: 288,
			masse: 1,
			habitable: 1,
			esi: 1,
			habitableMoon: 0,
			method: '-',
			year: '-',

			texture: 'earth.jpg',
			satellites: [
				{ // finish
					name: 'Moon',
					type: 'moon',
					radius: 1737.10,
					position: [120, 0, 0],
					isSatellite: true,
					rotationSpeed: 1,
					// from earth
					semiMajorAxis: 3843990,
					eccentricity: 0.0549,
					inclination: 18.29,
					siderealOrbitPeriod: 27.321582,

					temp: 288,
					masse: 1,
					habitable: 0,
					esi: 0.559,
					habitableMoon: 0,
					method: '-',
					year: '-',

					color: [56,56,56],
					texture: 'moon.jpg'
				}
			]

		},
		{
			name: 'Mars',
			type: 'planet',
			radius: 3396.2,
			position: [1400, 0, 0],

			semiMajorAxis: 227939100,
			eccentricity: 0.0935,
			inclination: 1.85,
			siderealOrbitPeriod: 686.980,
			rotationPeriod: 1.025957,
			longitudeAscendingNode: 49.562,

			temp: 210,
			masse: 0.10745,
			habitable: 0,
			esi: 0.697,
			habitableMoon: 0,
			method: '-',
			year: '-',

			texture: 'mars.jpg'
		},
		{
			name: 'Jupiter',
			type: 'planet',
			radius: 69911,
			position: [2100, 0, 0],

			semiMajorAxis: 778500000,
			eccentricity: 0.0484,
			inclination: 1.305,
			siderealOrbitPeriod: 4332.59,
			rotationPeriod: 9.925,

			temp: 165,
			masse: 317.84,
			habitable: 0,
			esi: 0.292,
			habitableMoon: 0,
			method: 'observation',
			year: '> 3000 BC',

			texture: 'jupiter.jpg',

			satellites: [
				{ // finish
					name: 'Io',
					type: 'moon',
					isSatellite: true,

					radius: 3643/2,
					rotationSpeed: 1, // synchronous
					semiMajorAxis: 421800,
					eccentricity: 0.004,
					inclination: 0.036,
					siderealOrbitPeriod: 1.77,

					temp: 110,
					masse: 0.015,
					habitable: 0,
					esi: 0.362,
					habitableMoon: 0,
					method: 'telescope',
					year: '1610',

					texture: 'io.jpg',
				},
				{ // finish
					name: 'Europa',
					type: 'moon',
					isSatellite: true,

					radius: 3122/2,
					rotationSpeed: 1,
					semiMajorAxis: 6711000,
					eccentricity: 0.009,
					inclination: 0.467,
					siderealOrbitPeriod: 3.55,

					temp: 102,
					masse: 0.008,
					habitable: 0,
					esi: 0.262,
					habitableMoon: 0,
					method: 'telescope',
					year: '1610',

					texture: 'moon.jpg'
				},
				{ // finish
					name: 'Ganymede',
					type: 'moon',
					isSatellite: true,

					radius: 5262/2,
					rotationSpeed: 1,
					semiMajorAxis: 10704000,
					eccentricity: 0.001,
					inclination: 0.20,
					siderealOrbitPeriod: 7.16,

					temp: 110,
					masse: 0.025,
					habitable: 0,
					esi: 0.289,
					habitableMoon: 0,
					method: 'telescope',
					year: '1610',

					texture: 'moon.jpg'
				},
				{ // finish
					name: 'Callisto',
					type: 'moon',
					isSatellite: true,

					radius: 4821/2,
					rotationSpeed: 1,
					semiMajorAxis: 18827000,
					eccentricity: 0.007,
					inclination: 0.307,
					siderealOrbitPeriod: 16.69,

					temp: 134,
					masse: 0.018,
					habitable: 0,
					esi: 0.338,
					habitableMoon: 0,
					method: 'telescope',
					year: '1610',

					texture: 'moon.jpg'
				}
			]
		},
		{ // finish
			name: 'Saturn',
			type: 'planet',
			radius: 60268,
			position: [2500, 0, 0],

			semiMajorAxis: 1433449370,
			eccentricity: 0.05648,
			inclination: 2.484,
			siderealOrbitPeriod: 10759.22,
			
			temp: 135,
			masse: 95.169,
			habitable: 0,
			esi: 0.246,
			habitableMoon: 0,
			method: 'observation',
			year: '> 3000 BC',

			texture: 'saturn.jpg',
			satellites: [
				{ // finish
					name: 'Titan',
					type: 'moon',
					isSatellite: true,

					radius: 2576,					
					rotationSpeed: 1,
					semiMajorAxis: 1221870,
					eccentricity: 0.0288,
					inclination: 0.34854,
					siderealOrbitPeriod: 15.945,

					temp: 93.7,
					masse: 0.0225,
					habitable: 0,
					esi: 0.242,
					habitableMoon: 0,
					method: 'telescope',
					year: '1655',

					color: [56,56,56],
					texture: 'moon.jpg'
				}
			]
		},
		{ // finish
			name: 'Uranus',
			type: 'planet',
			radius: 25559,
			position: [3100, 0, 0],

			semiMajorAxis: 2876679082,
			eccentricity: 0.0472,
			inclination: 0.770,
			siderealOrbitPeriod: 30799.095,
			
			temp: 76,
			masse: 14.539,
			habitable: 0,
			esi: 0.187,
			habitableMoon: 0,
			method: 'teleskope',
			year: '1781',

			color: [0,135,213],
			texture: 'uranus.jpg',
		},
		{ // finish
			name: 'Neptune',
			type: 'planet',
			radius: 24764,
			position: [3600, 0, 0],

			semiMajorAxis: 4503443661,
			eccentricity: 0.0113,
			inclination: 1.769,
			siderealOrbitPeriod: 60190.03,

			temp: 73,
			masse: 17.149,
			habitable: 0,
			esi: 0.184,
			habitableMoon: 0,
			method: 'telescope',
			year: '1846',
			
			texture: 'neptune.jpg',
		},

		// dwarf planets
		{ // finish
			name: 'Ceres',
			type: 'dwarf-planet',
			radius: 487.3,

			semiMajorAxis: 413910000,
			eccentricity: 0.075797,
			inclination: 10.593,
			siderealOrbitPeriod: 1680.99,
			longitudeAscendingNode: 80.3276,

			temp: 168,
			masse: 0.00015,
			habitable: 0,
			esi: 0.271,
			habitableMoon: 0,
			method: 'telescope',
			year: '1801',

			texture: 'moon.jpg',
		},
		{ // finish
			name: 'Pluto',
			type: 'dwarf-planet',
			radius: 1153,
			position: [3600, 0, 0],

			semiMajorAxis: 5908994718,
			eccentricity: 0.248807,
			inclination: 11.88,
			siderealOrbitPeriod: 90465,
			longitudeAscendingNode: 110.28683,

			temp: 44,
			masse: 0.00218,
			habitable: 0,
			esi: 0.075,
			habitableMoon: 0,
			method: 'telescope',
			year: '1930',

			texture: 'pluto.jpg',
		},
		{ // finish
			name: 'Eris',
			type: 'dwarf-planet',
			radius: 1163,
			position: [3600, 0, 0],

			semiMajorAxis: 10194533900,
			eccentricity: 0.437083,
			inclination: 43.8853,
			siderealOrbitPeriod: 205467.7296,
			longitudeAscendingNode: 36.031,

			temp: 42.5,
			masse: 0.0028,
			habitable: 0,
			esi: 0.054,
			habitableMoon: 0,
			method: 'telescope',
			year: '2005',

			texture: 'moon.jpg',
		},
		{ // finish
			name: 'Haumea',
			type: 'dwarf-planet',
			radius: 718,
			position: [3600, 0, 0],

			semiMajorAxis: 6483870900,
			eccentricity: 0.19501,
			inclination: 28.22,
			siderealOrbitPeriod: 103468,
			rotationPeriod: 0.163146,
			longitudeAscendingNode: 121.10,

			temp: 50,
			masse: 0.00066,
			habitable: 0,
			esi: 0.091,
			habitableMoon: 0,
			method: 'telescope',
			year: '2004',

			texture: 'moon.jpg',
		},
		{	// finish
			name: 'Makemake',
			type: 'dwarf-planet',
			radius: 739,

			semiMajorAxis: (6.8306 * Math.pow(10,9)),
			eccentricity: 0.159,
			inclination: 28.96,
			siderealOrbitPeriod: 113183,
			rotationPeriod: 0.32379167,
			longitudeAscendingNode: 79.382,

			temp: 36,
			masse: null,
			habitable: 0,
			esi: 0.043,
			habitableMoon: 0,
			method: 'telescope',
			year: '2005',

			texture: 'moon.jpg',
		},
		{ // finish
			name: 'Sedna',
			type: 'dwarf-planet',
			radius: 498,
			position: [3600, 0, 0],

			semiMajorAxis: (7.7576 * Math.pow(10,10)),
			eccentricity: 0.8527,
			inclination: 11.927,
			siderealOrbitPeriod: 4161000,
			rotationPeriod: 0.42,
			longitudeAscendingNode: 144.26,

			temp: 12,
			masse: 0.000167336,
			habitable: 0,
			esi: 0.013,
			habitableMoon: 0,
			method: 'telescope',
			year: '2003',

			texture: 'moon.jpg',
		}
	]
};