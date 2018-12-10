document.addEventListener("DOMContentLoaded", () => {
	const menuData = {
		header: {
			theme: 'web',
			brand: {
				label: 'Esri Global Navigation',
				brandText: 'Global Nav',
				href: './'
			},
			menus: [
				[
					{
						label: 'App Mode',
						href: './app-mode-nav.html'
					},
					{
						label: 'Web Mode',
						href: 'esri-global-nav.html'
					}
				]
			],
			search: {
				label: 'Search',
				// inline: true,
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
				disableDragAndDrop: false,
				displayIntro: true,
				ieVersion: null,
				text: {
					clear: "Clear",
					confirm: "Got it.",
					dragAppsHere: "Drag apps here that you don't use very often.",
					intro: "Drag and drop your favorite apps in any order to customize your app launcher",
					removed: "This app is no longer available.",
					removedMessage: "Removed app",
					showMore: "Show More"
				},
				primary: [
					{
						abbr: "APP",
						image: "http://www.arcgis.com/home/js/arcgisonline/sharing/dijit/css/images/app-icons/appstudio.png",
						label: "AppStudio for ArcGIS",
						url: "//appstudiodev.arcgis.com/apps.html",
						canAccess: true,
						itemId: "131049582192"
					},
					{
						abbr: "Studio",
						placeHolderIcon: "http://www.arcgis.com/home/js/arcgisonline/sharing/dijit/css/images/app-icons/svg-app-icon.svg",
						image: null,
						label: "Studio for ArcGIS",
						url: "//appstudiodev.arcgis.com/apps.html",
						canAccess: true,
						itemId: "131049582193"
					},
					{
						abbr: "Test",
						placeHolderIcon: "http://www.arcgis.com/home/js/arcgisonline/sharing/dijit/css/images/app-icons/svg-app-circle.svg",
						image: null,
						label: "Test App",
						url: "//appstudiodev.arcgis.com/apps.html",
						canAccess: true,
						isNew: true,
						itemId: "131049582194"
					}
				],
				secondary: [
					{
						abbr: "APP",
						image: "http://www.arcgis.com/home/js/arcgisonline/sharing/dijit/css/images/app-icons/appstudio.png",
						label: "AppStudio for ArcGIS",
						url: "//appstudiodev.arcgis.com/apps.html",
						canAccess: true,
						itemId: "131049582195"
					},
					{
						abbr: "Studio",
						placeHolderIcon: "http://www.arcgis.com/home/js/arcgisonline/sharing/dijit/css/images/app-icons/svg-app-icon.svg",
						image: null,
						label: "Studio for ArcGIS",
						url: "//appstudiodev.arcgis.com/apps.html",
						canAccess: false,
						itemId: "131049582196"
					}
				]
			},
			notifications: {
				label: 'Notifications',
				dismissAllLabel: 'Dismiss all',
				dismissLabel: 'Dismiss notification',
				clearAllLabel: 'Mark all as read',
				emptyMessage: {
					image: {
						path: ['M15.5 1A14.5 14.5 0 1 0 30 15.5 14.5 14.5 0 0 0 15.5 1zm0 28.1a13.6 13.6 0 1 1 13.6-13.6 13.615 13.615 0 0 1-13.6 13.6zM8.581 17.276l.637-.636 3.288 3.098 10.073-9.92.637.637-10.71 10.556z'],
						viewBox: '0 0 32 32'
					},
					text: "You're up to date!"
				},
				messages: [
					{
						text: 'You accepted the invitation to join the <a href="#">Basemap Gallery</a>.',
						date: 'Yesterday',
						id: '131049582194'
					},
					{
						text: 'You were invited to join the <a href="#">Public Analysis group</a>.',
						date: '2 days ago',
						id: '131049582197'
					},
					{
						text: 'You accepted the invitation to join the <a href="#">Basemap Gallery</a>.',
						date: '3 days ago',
						id: '131049582194'
					},
					{
						text: 'You were invited to join the <a href="#">Public Analysis group</a>.',
						date: '3 days ago',
						id: '131049582197'
					},
					{
						text: 'You accepted the invitation to join the <a href="#">Basemap Gallery</a>.',
						date: '4 days ago',
						id: '131049582194'
					},
					{
						text: 'You were invited to join the <a href="#">Public Analysis group</a>.',
						date: '5 days ago',
						id: '131049582197'
					},
					{
						text: 'You accepted the invitation to join the <a href="#">Basemap Gallery</a>.',
						date: '5 days ago',
						id: '131049582194'
					},
					{
						text: 'You were invited to join the <a href="#">Public Analysis group</a>.',
						date: '1 week ago',
						id: '131049582197'
					},
					{
						text: 'You requested to join the <a href="#">Basemap Gallery</a> group.',
						date: '2 weeks ago',
						id: '131049582199'
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
			hideMenus: false,
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
						platform: 'facebook',
						href: 'https://www.facebook.com/esrigis',
						image: {
							viewBox: '0 0 38 38',
							path: ['M38 38V0H0v38h17.2V21.9H14v-5.7h3.2v-3.7c0-2.6 1.2-6.7 6.7-6.7h4.9v5.5h-3.6c-.6 0-1.4.3-1.4 1.5v3.3h5.1l-.6 5.7h-4.5v16.1H38z']
						}
					},
					{
						label: 'Twitter',
						platform: 'twitter',
						href: 'https://twitter.com/Esri',
						image: {
							viewBox: '0 0 512 512',
							path: ['M512.002 97.211c-18.84 8.354-39.082 14.001-60.33 16.54 21.686-13 38.342-33.585 46.186-58.115a210.29 210.29 0 0 1-66.705 25.49c-19.16-20.415-46.461-33.17-76.674-33.17-58.011 0-105.042 47.029-105.042 105.039 0 8.233.929 16.25 2.72 23.939-87.3-4.382-164.701-46.2-216.509-109.753-9.042 15.514-14.223 33.558-14.223 52.809 0 36.444 18.544 68.596 46.73 87.433a104.614 104.614 0 0 1-47.577-13.139c-.01.438-.01.878-.01 1.321 0 50.894 36.209 93.348 84.261 103a105.245 105.245 0 0 1-27.674 3.687c-6.769 0-13.349-.66-19.764-1.888 13.368 41.73 52.16 72.104 98.126 72.949-35.95 28.176-81.243 44.967-130.458 44.967-8.479 0-16.84-.496-25.058-1.471 46.486 29.807 101.701 47.197 161.021 47.197 193.211 0 298.868-160.062 298.868-298.872 0-4.554-.104-9.084-.305-13.59 20.526-14.809 38.335-33.309 52.417-54.373z']
						}
					},
					{
						label: 'LinkedIn',
						platform: 'linkedin',
						href: 'https://www.linkedin.com/company/esri',
						image: {
							viewBox: '0 0 24 24',
							path: ['M0 0v24h24V0zm8 19H5V8h3zM6.5 6.7A1.8 1.8 0 1 1 8.3 5a1.8 1.8 0 0 1-1.8 1.7zM20 19h-3v-5.6c0-3.4-4-3.1-4 0V19h-3V8h3v1.8c1.4-2.6 7-2.8 7 2.5z']
						}
					},
					{
						label: 'Instagram',
						platform: 'instagram',
						href: 'https://www.instagram.com/esrigram/',
						image: {
							viewBox: '0 0 30 30',
							path: ['M29.91 8.815c-.073-1.596-.327-2.686-.697-3.64a7.354 7.354 0 0 0-1.73-2.657 7.352 7.352 0 0 0-2.657-1.73C23.87.416 22.78.162 21.184.09 19.584.017 19.074 0 15 0s-4.585.017-6.184.09C7.219.163 6.129.417 5.174.787a7.352 7.352 0 0 0-2.656 1.73 7.354 7.354 0 0 0-1.73 2.657C.416 6.13.162 7.22.09 8.815.017 10.415 0 10.926 0 15s.017 4.585.09 6.184c.073 1.597.327 2.687.697 3.642a7.353 7.353 0 0 0 1.73 2.656 7.353 7.353 0 0 0 2.657 1.73c.955.371 2.045.625 3.642.698 1.6.073 2.11.09 6.184.09s4.585-.017 6.184-.09c1.597-.073 2.687-.327 3.642-.697a7.353 7.353 0 0 0 2.656-1.73 7.353 7.353 0 0 0 1.73-2.657c.371-.955.625-2.045.698-3.642.073-1.6.09-2.11.09-6.184s-.017-4.585-.09-6.185zm-2.997 12.232c-.064 1.412-.287 2.153-.496 2.691a4.376 4.376 0 0 1-1.056 1.623 4.371 4.371 0 0 1-1.622 1.055c-.539.21-1.28.433-2.691.497-1.573.072-2.045.087-6.048.087s-4.475-.015-6.047-.087c-1.412-.064-2.153-.287-2.691-.496a4.376 4.376 0 0 1-1.623-1.056 4.371 4.371 0 0 1-1.055-1.622c-.21-.539-.433-1.28-.497-2.691C3.015 19.475 3 19.003 3 15s.015-4.475.087-6.047c.064-1.412.287-2.153.496-2.691a4.38 4.38 0 0 1 1.056-1.623A4.371 4.371 0 0 1 6.26 3.584c.539-.21 1.28-.433 2.691-.497C10.525 3.015 10.997 3 15 3s4.475.015 6.047.087c1.412.064 2.153.287 2.691.496a4.38 4.38 0 0 1 1.623 1.056c.493.493.8.963 1.055 1.622.21.539.433 1.28.497 2.691.072 1.573.087 2.045.087 6.048s-.015 4.475-.087 6.047zM15 7.175a7.825 7.825 0 1 0 0 15.65 7.825 7.825 0 0 0 0-15.65zm0 12.65c-2.66 0-4.825-2.164-4.825-4.825s2.164-4.825 4.825-4.825 4.825 2.164 4.825 4.825-2.164 4.825-4.825 4.825zm6.007-12.832a2 2 0 1 0 4 0 2 2 0 1 0-4 0']
						}
					},
					{
						label: 'YouTube',
						platform: 'youtube',
						href: 'https://www.youtube.com/user/esritv',
						image: {
							viewBox: '0 0 310 310',
							path: ['M297.917 64.645c-11.19-13.302-31.85-18.728-71.306-18.728H83.386c-40.359 0-61.369 5.776-72.517 19.938C0 79.663 0 100.008 0 128.166v53.669c0 54.551 12.896 82.248 83.386 82.248h143.226c34.216 0 53.176-4.788 65.442-16.527C304.633 235.518 310 215.863 310 181.835v-53.669c0-29.695-.841-50.16-12.083-63.521zm-98.896 97.765l-65.038 33.991a9.997 9.997 0 0 1-14.632-8.863v-67.764a10 10 0 0 1 14.609-8.874l65.038 33.772a10 10 0 0 1 .023 17.738z']
						}
					},
					{
						label: 'GeoNet',
						platform: 'geonet',
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
