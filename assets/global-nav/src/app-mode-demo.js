document.addEventListener("DOMContentLoaded", () => {
	const menuData = {
		header: {
			theme: 'app',
			brand: {
				label: 'Dashboard',
				brandText: 'Mapping Dashboard',
				image: './img/dashboard-icon_24.svg',
				href: 'https://www.esri.com/',
				width: 80,
				height: 30,
				topStripe : '#e8912e'
			},
			collapseMenus: [true, false],
			menus: [
				[
					{
						label: 'Home',
						href : '/app-mode-nav.html#home'
					},
					{
						label: 'Gallery',
						href : '/app-mode-nav.html#gallery'
					},
					{
						label: 'Scene',
						href : '/app-mode-nav.html#scene'
					}
				],[
					{
						label: 'Save map',
						href : '/app-mode-nav.html#save',
						icon : {
							path: './img/placeholder_disk.svg'
						}
					},
					{
						label: 'New map',
						hideLabelInDesktop : true,
						icon : {
							path: './img/placeholder_add.svg'
						},
						href : '/app-mode-nav.html#new'
					},
					{
						label: 'Recent maps',
						tiles: [
							{
								label: 'ArcGIS Pro',
								href: 'https://www.esri.com/arcgis/products/arcgis-pro/Overview',
								icon: [
									'M15 36.1h-2.1v-3.2H15v-.8H1.5a.6.6 0 0 1-.6-.6v-26a.6.6 0 0 1 .6-.6h38a.6.6 0 0 1 .6.6V23h.8V5.5a1.401 1.401 0 0 0-1.4-1.4h-38A1.401 1.401 0 0 0 .1 5.5v26a1.401 1.401 0 0 0 1.4 1.4h10.6v3.2H8v.8h7z',
									'M43.9 41.1V26.5a1.401 1.401 0 0 0-1.4-1.4h-24a1.401 1.401 0 0 0-1.4 1.4v14.6h-3V43a1.902 1.902 0 0 0 1.9 1.9h29a1.902 1.902 0 0 0 1.9-1.9v-1.9zm-26-14.6a.6.6 0 0 1 .6-.6h24a.6.6 0 0 1 .6.6v14.6h-1.2v-14H19.1v14h-1.2zm2 14.6V27.9h21.2v13.2zM46.1 43a1.101 1.101 0 0 1-1.1 1.1H16a1.101 1.101 0 0 1-1.1-1.1v-1.1h13.164A1.495 1.495 0 0 0 29.5 43h3a1.492 1.492 0 0 0 1.433-1.1H46.1z',
									'M34 30.9h2.884l-5.736 5.089-4.214-3.029-4.239 4.981.61.518 3.761-4.419 4.135 2.971 5.899-5.233V34h.8v-3.9H34v.8zm3.9-7.9V7.1H3.1v22.8H15v-.8h-1.546c-.021-.08-.04-.152-.044-.136a1.58 1.58 0 0 1 .462-.86 2.677 2.677 0 0 0 .486-.763 1.466 1.466 0 0 0-.056-.93 1.807 1.807 0 0 1-.099-.5c0-1.054-1.089-1.308-1.884-1.494-.356-.083-.894-.21-.97-.362-.398-.796-.04-1.212.628-1.878a2.653 2.653 0 0 0 1.03-1.831c0-.572-.31-1.512-1.137-1.595a2.261 2.261 0 0 0-1.157.19 1.825 1.825 0 0 1-.738.166c-.298 0-.618-.175-.618-.436a1.857 1.857 0 0 1 .31-.918 2.578 2.578 0 0 0 .407-1.298 3.17 3.17 0 0 0-.132-.85 2.413 2.413 0 0 1-.106-.645 1.044 1.044 0 0 1 .976-1.098c.477 0 .705.368 1.086 1.05a1.876 1.876 0 0 0 1.786.925c1.377 0 2.255-1.584 2.255-2.675a.707.707 0 0 1 .619-.736 1.176 1.176 0 0 1 .715.338 1.923 1.923 0 0 0 1.199.5c.98 0 1.386-.72 1.745-1.356a2.536 2.536 0 0 1 .899-1.087A2.644 2.644 0 0 0 22.31 7.9H37.1v9.362c-.116.067-.236.133-.343.201a1.916 1.916 0 0 1-1.076.414c-.164 0-.335-.012-.511-.024a4.623 4.623 0 0 0-1.42.07c-.321.089-.708.219-1.063.339a9.223 9.223 0 0 1-.885.274 2.082 2.082 0 0 0-.91.284 1.495 1.495 0 0 1-.556.2 2.912 2.912 0 0 1-1.845-.81 2.09 2.09 0 0 1-.425-.628c-.231-.445-.52-1-1.276-1a1.856 1.856 0 0 0-1.495 1.031c-.3.428-.502.691-.839.691a1.58 1.58 0 0 1-.555-.143 2.268 2.268 0 0 0-.84-.197c-.678 0-1.434.475-1.434 1.156v1.168c0 .312-.17.499-.472.8a1.88 1.88 0 0 0-.707 1.37 1.232 1.232 0 0 0 .343.781l.321-.239.267-.31c-.092-.12-.13-.173-.13-.232 0-.314.17-.5.473-.804a1.878 1.878 0 0 0 .705-1.366V19.12c0-.147.328-.355.635-.355a1.575 1.575 0 0 1 .553.143 2.283 2.283 0 0 0 .841.196 1.854 1.854 0 0 0 1.494-1.03c.302-.428.504-.691.84-.691.239 0 .33.114.567.569a2.77 2.77 0 0 0 .606.86 3.635 3.635 0 0 0 2.373 1.008 2.08 2.08 0 0 0 .912-.284 1.498 1.498 0 0 1 .554-.2 4.634 4.634 0 0 0 1.14-.317c.342-.115.712-.24 1.02-.325a3.843 3.843 0 0 1 1.155-.043c.194.013.383.025.564.025a2.511 2.511 0 0 0 1.419-.485V23zM20.734 10.12a3.23 3.23 0 0 0-1.215 1.396c-.351.624-.557.95-1.047.95a1.178 1.178 0 0 1-.717-.338 1.92 1.92 0 0 0-1.198-.5 1.5 1.5 0 0 0-1.418 1.536c0 .643-.567 1.875-1.455 1.875a1.105 1.105 0 0 1-1.106-.548c-.373-.669-.796-1.427-1.766-1.427a1.841 1.841 0 0 0-1.776 1.897 3.159 3.159 0 0 0 .131.848 2.405 2.405 0 0 1 .107.648 1.855 1.855 0 0 1-.31.915 2.584 2.584 0 0 0-.407 1.3 1.327 1.327 0 0 0 1.417 1.236 2.573 2.573 0 0 0 1.03-.221 1.45 1.45 0 0 1 .784-.14c.278.028.418.528.418.8 0 .47-.368.839-.795 1.264-.648.647-1.454 1.451-.778 2.802.245.489.856.632 1.504.783.876.205 1.266.357 1.266.715a2.482 2.482 0 0 0 .131.725.896.896 0 0 1 .067.443 2.159 2.159 0 0 1-.353.523 2.228 2.228 0 0 0-.638 1.361.59.59 0 0 0 .018.136H3.9V7.9h17.602c.139.9.089 1.756-.768 2.22z'
								]
							},
							{
								label: 'ArcGIS Online',
								href: 'https://www.esri.com/software/arcgis/arcgisonline',
								icon: [
									'M37.396 37.211l3.898 2.274L27.5 47.53l-13.794-8.046 3.898-2.274.794.463-3.104 1.81 3.736 2.18a19.35 19.35 0 0 1 3.408-1.633l.892.52-.418.148a18.678 18.678 0 0 0-3.078 1.435l7.666 4.471 6.635-3.87-3.105-1.81.794-.464 3.105 1.81 3.174-1.851a24.69 24.69 0 0 0-4.61-.932l1.123-.656a23.867 23.867 0 0 1 4.414 1.047l.676-.394-3.105-1.81zm1.012-22.16A11.768 11.768 0 0 0 26.35 4.767a11.829 11.829 0 0 0-10.613 5.857 7.369 7.369 0 0 0-2.312-.374 7.457 7.457 0 0 0-7.437 7.87A9.797 9.797 0 0 0 9.9 36.9H12v-.8H9.9a8.997 8.997 0 0 1-3.342-17.352l.278-.111a8.811 8.811 0 0 1-.061-.937 6.635 6.635 0 0 1 9.01-6.21l.332.126.164-.316A11.006 11.006 0 0 1 26.35 5.566a10.973 10.973 0 0 1 11.295 9.882l.031.326.326.034a10.176 10.176 0 0 1 3.578 19.168l.366.71a10.976 10.976 0 0 0-3.538-20.635zm-1.036 15.168l3.922 2.287L27.5 40.552l-13.794-8.046 3.922-2.287.794.463-3.128 1.824 2.197 1.282 3.127-1.825.795.463-3.128 1.825 6.674 3.893 12.206-7.12-.587-.342zm2.334 2.287l-1.747-1.019-12.206 7.12 1.747 1.02zM23.9 24.5a.6.6 0 1 0 .6-.6.6.6 0 0 0-.6.6zm-.4 2.1a.9.9 0 1 1-.9.9.901.901 0 0 1 .9-.9zm4-9.146L13.706 25.5 27.5 33.546 41.294 25.5zM39.706 25.5l-10.382 6.056c-.495-.69-.525-.943-.525-.99a2.049 2.049 0 0 1 .431-1.192 2.2 2.2 0 0 0 .455-1.225 1.905 1.905 0 0 0-1.077-1.504c-.43-.299-.693-.5-.693-.77a4.37 4.37 0 0 1 .212-.648 4.912 4.912 0 0 0 .4-1.514 1.354 1.354 0 0 0-.502-1.094 34.71 34.71 0 0 0-3.484-2.514L27.5 18.38zm-24.412 0l8.47-4.941a34.305 34.305 0 0 1 3.753 2.677.567.567 0 0 1 .21.477 4.636 4.636 0 0 1-.35 1.233 3.07 3.07 0 0 0-.262.926c0 .713.575 1.11 1.038 1.43.455.316.732.53.732.847a1.491 1.491 0 0 1-.328.793A2.805 2.805 0 0 0 28 30.566a2.53 2.53 0 0 0 .63 1.395l-1.13.66zm17.206-.9a.9.9 0 1 1-.9.9.901.901 0 0 1 .9-.9z'
								]
							},
							{
								label: 'ArcGIS Enterprise',
								href: 'https://www.esri.com/arcgis/products/arcgis-enterprise/Overview',
								icon: [
									'M13 15h-2v-2h2zm4-2h-2v2h2zm4 0h-2v2h2zm4 0h-2v2h2zm4 0h-2v2h2zM13 24h-2v2h2zm4 0h-2v2h2zm4 0h-2v2h2zm4 0h-2v2h2zm4 0h-2v2h2zM13 35h-2v2h2zm4 0h-2v2h2zm4 0h-2v2h2zm4 0h-2v2h2zm4 0h-2v2h2zm17.4-1.5a.9.9 0 1 0-.9.9.901.901 0 0 0 .9-.9zm-25 12a.9.9 0 1 0-.9.9.901.901 0 0 0 .9-.9zm-18-38a.9.9 0 1 0-.9.9.901.901 0 0 0 .9-.9zm20-5a.9.9 0 1 0-.9.9.901.901 0 0 0 .9-.9zM7.1 29.9h33.8v-9.8H7.1zm.8-9h32.2v8.2H7.9zm-.8 20h33.8v-9.8H7.1zm.8-9h32.2v8.2H7.9zM7.1 9.1v9.8h33.8V9.1zm33 9H7.9V9.9h32.2zM4.923 5.138l-.571-.56A14.923 14.923 0 0 1 19.492.789l-.241.763A14.08 14.08 0 0 0 4.923 5.138zM13.856 42.5a20.468 20.468 0 0 0 3.288 2.133l.367-.711a19.588 19.588 0 0 1-2.297-1.422zm14.01-35a14.9 14.9 0 0 0-2.444-3.148l-.56.57A14.132 14.132 0 0 1 26.937 7.5zM5.5 25.397A14.047 14.047 0 0 1 1.552 10.75l-.763-.241A14.836 14.836 0 0 0 5.5 26.45zm37-11.527v1.319a19.62 19.62 0 0 1 3.272 14.904l.787.145A20.395 20.395 0 0 0 42.5 13.87zM37.817 42.5a19.613 19.613 0 0 1-13.963 3.423l-.107.793A20.373 20.373 0 0 0 39.124 42.5zm4.683-4.687v1.318a20.462 20.462 0 0 0 1.69-2.463l-.694-.4c-.305.53-.641 1.044-.996 1.545z'
								]
							},
							{
								label: 'Apps',
								href: 'https://www.esri.com/software/apps',
								icon: [
									'M34.489 3.155l-9.37 4.408v4.128l.801.248V8.07l8.63-4.059 8.569 2.649v13.41l-8.63 4.084-4.489-1.4v.838l4.55 1.42 9.37-4.436V6.07l-9.431-2.915z',
									'M22 35.04l-6.03 2.854L4.9 34.439V17.152l11.13-5.235 11.07 3.422v12.408l.8-.377V14.749l-11.93-3.687L4.1 16.645v18.382l11.93 3.724L22 35.925v-.885z',
									'M30.97 28.247L24.1 31.48v10.627l6.93 2.164 6.87-3.252v-10.63zm6.13 12.265l-6.13 2.901-6.07-1.894v-9.533l6.13-2.884 6.07 1.877z'
								]
							}
						]
					}
				]
			],
			search: {
				hide: true,
				label: 'Search',
				image: [
					'M15.61 14.531l8.132 8.133-1.078 1.078-8.156-8.18-.188.188c-.844.672-1.773 1.164-2.789 1.476s-2.04.446-3.07.399a8.513 8.513 0 0 1-5.648-2.508c-.86-.859-1.5-1.824-1.922-2.894s-.633-2.16-.633-3.27.211-2.199.633-3.27 1.062-2.027 1.922-2.87c.843-.86 1.8-1.5 2.87-1.922s2.16-.633 3.27-.633 2.2.211 3.27.633 2.035 1.062 2.894 1.922a8.406 8.406 0 0 1 1.805 2.648 8.61 8.61 0 0 1 .293 6.094 8.626 8.626 0 0 1-1.512 2.812l-.14.141.046.023zm-6.704 1.594c.797 0 1.574-.13 2.332-.387a7.404 7.404 0 0 0 2.098-1.113l1.242-1.265a7.209 7.209 0 0 0 1.547-4.864 7.071 7.071 0 0 0-2.086-4.629c-.672-.687-1.445-1.21-2.32-1.57s-1.797-.539-2.766-.539-1.89.18-2.765.54-1.649.882-2.32 1.57c-.704.703-1.231 1.496-1.583 2.378s-.527 1.785-.527 2.707.176 1.825.527 2.707.88 1.676 1.582 2.38a7.049 7.049 0 0 0 2.309 1.546 7.06 7.06 0 0 0 2.73.539z'
				],
				dialog: {
					action: 'https://pages.codehub.esri.com/marketing/esri-search-page/',
					label: 'Esri',
					'submitLabel': 'Search',
					'cancelLabel': 'Cancel',
					'queryLabel': 'Search Esri.com'
				}
			},
			apps: {
				label: 'Applications',
				image: {
					path: './img/gnav-app-switcher-icon.svg',
					width: 24,
					height: 24
				},
				icons: [
					{
						abbr: "APP",
						image: "http://www.arcgis.com/home/js/arcgisonline/sharing/dijit/css/images/app-icons/appstudio.png",
						label: "AppStudio for ArcGIS",
						url: "//appstudiodev.arcgis.com/apps.html"
					},
					{
						abbr: "Studio",
						placeHolderIcon: "http://www.arcgis.com/home/js/arcgisonline/sharing/dijit/css/images/app-icons/svg-app-icon.svg",
						image: null,
						label: "Studio for ArcGIS",
						url: "//appstudiodev.arcgis.com/apps.html"
					},
					{
						abbr: "Test",
						placeHolderIcon: "http://www.arcgis.com/home/js/arcgisonline/sharing/dijit/css/images/app-icons/svg-app-circle.svg",
						image: null,
						label: "Test App",
						url: "//appstudiodev.arcgis.com/apps.html"
					}
				]
			},
			account: {
				label: 'Account Profile',
				controls: {
					signin: 'Sign In',
					signout: 'Sign Out',
					switch: 'Switch Account'
				},
				menus: [
					{
						label: 'Profile & Settings',
						href: '#user-menu-link-1'
					},
					{
						label: 'My Esri',
						href: '#user-menu-link-2'
					},
					{
						label: 'Training',
						href: '#user-menu-link-3'
					},
					{
						label: 'Community & Forums',
						href: '#user-menu-link-4'
					}
				],
				user: {
					name: 'Cassidy Bishop',
					id: 'iamoktatester@gmail.com',
					group: 'Riverside City Mgmt.',
					image: '//placehold.it/300x300'
				}
			}
		},
		footer: {
			label: 'Esri',
			brand: {
				label: 'Esri: The Science of Where',
				href: 'https://www.esri.com/about-esri',
				viewBox: '0 0 114 90',
				path: './img/gnav-tsow-frame.svg'
			},
			menu: {
				label: 'Esri Sites',
				menu: [
					{
						label: 'ArcGIS',
						menu: [
							{
								label: 'About ArcGIS',
								href: 'https://www.esri.com/arcgis/about-arcgis'
							},
							{
								label: 'ArcGIS Pro',
								href: 'https://www.esri.com/en/arcgis/products/arcgis-pro/Overview'
							},
							{
								label: 'ArcGIS Enterprise',
								href: 'https://www.esri.com/en/arcgis/products/arcgis-enterprise/Overview'
							},
							{
								label: 'ArcGIS Online',
								href: 'https://www.esri.com/software/arcgis/arcgisonline'
							},
							{
								label: 'Apps',
								href: 'https://www.esri.com/software/apps'
							},
							{
								label: 'ArcGIS for Developers',
								href: 'https://developers.arcgis.com/'
							}
						]
					},
					{
						label: 'Community',
						menu: [
							{
								label: 'Esri Community (GeoNet)',
								href: 'https://geonet.esri.com/'
							},
							{
								label: 'ArcGIS Blog',
								href: 'https://blogs.esri.com/esri/arcgis'
							},
							{
								label: 'Early Adopter Community',
								href: 'https://www.esri.com/early-adopter-community'
							},
							{
								label: 'Events',
								href: 'https://www.esri.com/events'
							}
						]
					},
					{
						label: 'Understanding GIS',
						menu: [
							{
								label: 'What is GIS?',
								href: 'https://www.esri.com/what-is-gis'
							},
							{
								label: 'Training',
								href: 'https://www.esri.com/training'
							},
							{
								label: 'Maps We Love',
								href: 'https://www.esri.com/products/maps-we-love'
							},
							{
								label: 'Blog',
								href: 'https://www.esri.com/about/newsroom/blog'
							},
							{
								label: 'WhereNext Magazine',
								href: 'https://www.esri.com/about/newsroom/publications/wherenext/'
							},
							{
								label: 'Learn ArcGIS',
								href: 'https://learn.arcgis.com/en/'
							}
						]
					},
					{
						label: 'Company',
						menu: [
							{
								label: 'About Esri',
								href: 'https://www.esri.com/about-esri'
							},
							{
								label: 'Contact Us',
								href: 'https://www.esri.com/about-esri/contact'
							},
							{
								label: 'Esri Offices Worldwide',
								href: 'https://www.esri.com/about-esri/contact#international'
							},
							{
								label: 'Careers',
								href: 'https://www.esri.com/careers'
							},
							{
								label: 'Open Vision',
								href: 'https://www.esri.com/software/open'
							},
							{
								label: 'Partners',
								href: 'https://www.esri.com/partners'
							}
						]
					},
					{
						label: 'Special programs',
						menu: [
							{
								label: 'Conservation',
								href: 'https://www.esri.com/esri-conservation-program'
							},
							{
								label: 'Disaster Response',
								href: 'https://www.esri.com/services/disaster-response'
							},
							{
								label: 'Education',
								href: 'https://www.esri.com/industries/education'
							},
							{
								label: 'Nonprofit',
								href: 'https://www.esri.com/nonprofit'
							},
							{
								label: 'US Navy SeaPort-e Information',
								href: 'https://www.esri.com/landing-pages/seaport'
							}
						]
					}
				]
			},
			social: {
				label: 'Social Media',
				menu: [
					{
						label: 'Facebook',
						href: 'https://www.facebook.com/esrigis',
						image: {
							viewBox: '0 0 38 38',
							path: ['M38 38V0H0v38h17.2V21.9H14v-5.7h3.2v-3.7c0-2.6 1.2-6.7 6.7-6.7h4.9v5.5h-3.6c-.6 0-1.4.3-1.4 1.5v3.3h5.1l-.6 5.7h-4.5v16.1H38z']
						}
					},
					{
						label: 'Twitter',
						href: 'https://twitter.com/Esri',
						image: {
							viewBox: '0 0 512 512',
							path: ['M512.002 97.211c-18.84 8.354-39.082 14.001-60.33 16.54 21.686-13 38.342-33.585 46.186-58.115a210.29 210.29 0 0 1-66.705 25.49c-19.16-20.415-46.461-33.17-76.674-33.17-58.011 0-105.042 47.029-105.042 105.039 0 8.233.929 16.25 2.72 23.939-87.3-4.382-164.701-46.2-216.509-109.753-9.042 15.514-14.223 33.558-14.223 52.809 0 36.444 18.544 68.596 46.73 87.433a104.614 104.614 0 0 1-47.577-13.139c-.01.438-.01.878-.01 1.321 0 50.894 36.209 93.348 84.261 103a105.245 105.245 0 0 1-27.674 3.687c-6.769 0-13.349-.66-19.764-1.888 13.368 41.73 52.16 72.104 98.126 72.949-35.95 28.176-81.243 44.967-130.458 44.967-8.479 0-16.84-.496-25.058-1.471 46.486 29.807 101.701 47.197 161.021 47.197 193.211 0 298.868-160.062 298.868-298.872 0-4.554-.104-9.084-.305-13.59 20.526-14.809 38.335-33.309 52.417-54.373z']
						}
					},
					{
						label: 'LinkedIn',
						href: 'https://www.linkedin.com/company/esri',
						image: {
							viewBox: '0 0 24 24',
							path: ['M0 0v24h24V0zm8 19H5V8h3zM6.5 6.7A1.8 1.8 0 1 1 8.3 5a1.8 1.8 0 0 1-1.8 1.7zM20 19h-3v-5.6c0-3.4-4-3.1-4 0V19h-3V8h3v1.8c1.4-2.6 7-2.8 7 2.5z']
						}
					},
					{
						label: 'Instagram',
						href: 'https://www.instagram.com/esrigram/',
						image: {
							viewBox: '0 0 30 30',
							path: ['M29.91 8.815c-.073-1.596-.327-2.686-.697-3.64a7.354 7.354 0 0 0-1.73-2.657 7.352 7.352 0 0 0-2.657-1.73C23.87.416 22.78.162 21.184.09 19.584.017 19.074 0 15 0s-4.585.017-6.184.09C7.219.163 6.129.417 5.174.787a7.352 7.352 0 0 0-2.656 1.73 7.354 7.354 0 0 0-1.73 2.657C.416 6.13.162 7.22.09 8.815.017 10.415 0 10.926 0 15s.017 4.585.09 6.184c.073 1.597.327 2.687.697 3.642a7.353 7.353 0 0 0 1.73 2.656 7.353 7.353 0 0 0 2.657 1.73c.955.371 2.045.625 3.642.698 1.6.073 2.11.09 6.184.09s4.585-.017 6.184-.09c1.597-.073 2.687-.327 3.642-.697a7.353 7.353 0 0 0 2.656-1.73 7.353 7.353 0 0 0 1.73-2.657c.371-.955.625-2.045.698-3.642.073-1.6.09-2.11.09-6.184s-.017-4.585-.09-6.185zm-2.997 12.232c-.064 1.412-.287 2.153-.496 2.691a4.376 4.376 0 0 1-1.056 1.623 4.371 4.371 0 0 1-1.622 1.055c-.539.21-1.28.433-2.691.497-1.573.072-2.045.087-6.048.087s-4.475-.015-6.047-.087c-1.412-.064-2.153-.287-2.691-.496a4.376 4.376 0 0 1-1.623-1.056 4.371 4.371 0 0 1-1.055-1.622c-.21-.539-.433-1.28-.497-2.691C3.015 19.475 3 19.003 3 15s.015-4.475.087-6.047c.064-1.412.287-2.153.496-2.691a4.38 4.38 0 0 1 1.056-1.623A4.371 4.371 0 0 1 6.26 3.584c.539-.21 1.28-.433 2.691-.497C10.525 3.015 10.997 3 15 3s4.475.015 6.047.087c1.412.064 2.153.287 2.691.496a4.38 4.38 0 0 1 1.623 1.056c.493.493.8.963 1.055 1.622.21.539.433 1.28.497 2.691.072 1.573.087 2.045.087 6.048s-.015 4.475-.087 6.047zM15 7.175a7.825 7.825 0 1 0 0 15.65 7.825 7.825 0 0 0 0-15.65zm0 12.65c-2.66 0-4.825-2.164-4.825-4.825s2.164-4.825 4.825-4.825 4.825 2.164 4.825 4.825-2.164 4.825-4.825 4.825zm6.007-12.832a2 2 0 1 0 4 0 2 2 0 1 0-4 0']
						}
					},
					{
						label: 'YouTube',
						href: 'https://www.youtube.com/user/esritv',
						image: {
							viewBox: '0 0 310 310',
							path: ['M297.917 64.645c-11.19-13.302-31.85-18.728-71.306-18.728H83.386c-40.359 0-61.369 5.776-72.517 19.938C0 79.663 0 100.008 0 128.166v53.669c0 54.551 12.896 82.248 83.386 82.248h143.226c34.216 0 53.176-4.788 65.442-16.527C304.633 235.518 310 215.863 310 181.835v-53.669c0-29.695-.841-50.16-12.083-63.521zm-98.896 97.765l-65.038 33.991a9.997 9.997 0 0 1-14.632-8.863v-67.764a10 10 0 0 1 14.609-8.874l65.038 33.772a10 10 0 0 1 .023 17.738z']
						}
					},
					{
						label: 'GeoNet',
						href: 'https://geonet.esri.com/',
						image: {
							viewBox: '7 7 16 16',
							path: ['M23 19h-3v4l-4-4H7V9h16z']
						}
					}
				]
			},
			info: {
				label: 'Additional Links',
				menu: [
					{
						label: 'Privacy',
						href: 'https://www.esri.com/legal/privacy'
					},
					{
						label: 'Legal',
						href: 'https://www.esri.com/legal'
					},
					{
						label: 'Site Map',
						href: 'http://www.esri.com/site-map'
					},
					{
						label: 'Terms and Conditions',
						href: 'https://www.esri.com/legal/software-license'
					},
					{
						label: 'Code of Business Conduct',
						href: 'https://www.esri.com/about-esri/code-of-conduct'
					}
				]
			},
			language: {
				label: 'Switch Languages',
				buttonLabel: 'United States (English)',
				submitLabel: 'Change',
				greetingLabel: 'Hello!',
				messageLabel: 'You are seeing the English page. Is this correct?',
				closeLabel: 'Close Navigation',
				optionsLabel: 'Desired Language',
				options: [
					{
						label: 'English',
						value: '#the-english-page'
					},
					{
						label: 'French',
						value: '#the-french-page'
					}, {
						label: 'Spanish',
						value: '#the-spanish-page'
					}
				]
			}
		}
	};

	esriGlobalNav.create({headerElm: '.esri-header-barrier', footerElm: '.esri-footer-barrier', menuData});
});
