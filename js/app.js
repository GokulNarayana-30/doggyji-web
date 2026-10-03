/* Doggy Ji website. AngularJS 1.x from a CDN, no build step.
   Contact details and the Play Store link live here, in one place. */
(function () {
  'use strict';

  var app = angular.module('doggyji', []);

  app.constant('SITE', {
    name: 'Doggy Ji',
    company: 'Fensco Foods',
    email: 'info@doggyji.com',
    phone: '+91 866 0808 858',
    phoneHref: '+918660808858',
    address: '797 Pradhan Villa, BCCHS Layout, Vajarahalli, Bangalore 560062, Karnataka, India',
    shop: 'https://www.doggyji.com',
    // Goes live once the app is published on Google Play.
    playStore: 'https://play.google.com/store/apps/details?id=com.doggyji.doggyji_companion',
    year: new Date().getFullYear()
  });

  // Fades sections in as they scroll into view; shows everything at once
  // where IntersectionObserver is missing.
  app.directive('reveal', function () {
    return {
      restrict: 'A',
      link: function (scope, el) {
        var node = el[0];
        node.classList.add('rv');
        if (!('IntersectionObserver' in window)) { node.classList.add('in'); return; }
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { node.classList.add('in'); io.disconnect(); }
          });
        }, { threshold: 0.12 });
        io.observe(node);
      }
    };
  });

  app.controller('PageCtrl', ['$scope', 'SITE', function ($scope, SITE) {
    $scope.site = SITE;
    $scope.menu = false;
    $scope.toggle = function () { $scope.menu = !$scope.menu; };
  }]);

  app.controller('HomeCtrl', ['$scope', function ($scope) {
    $scope.groups = [
      { id: 'all', label: 'Everything' },
      { id: 'shop', label: 'Shop' },
      { id: 'care', label: 'Pet care' },
      { id: 'social', label: 'Community' },
      { id: 'help', label: 'Emergency' },
      { id: 'app', label: 'The app' }
    ];
    $scope.group = 'all';
    $scope.setGroup = function (g) { $scope.group = g; };
    $scope.show = function (f) { return $scope.group === 'all' || f.group === $scope.group; };

    $scope.features = [
      { group: 'shop', icon: '🛍️', bg: 'rgba(35,193,195,.18)', title: 'Healthy treats and food', text: "Browse Doggy Ji's natural biscuits, ragi shots, broths, cat food and accessories, and check out securely through our store." },
      { group: 'shop', icon: '🔁', bg: 'rgba(255,179,0,.2)', title: 'Subscribe & Save', text: 'Pick a subscription product and get it delivered on repeat. Pausing and cancelling is handled from the subscription email.' },
      { group: 'shop', icon: '❤️', bg: 'rgba(211,47,47,.12)', title: 'Wishlist and orders', text: 'Save favourites, follow every order from placed to delivered, and buy the same thing again in a tap.' },
      { group: 'care', icon: '🐕', bg: 'rgba(20,44,115,.12)', title: 'A profile for every pet', text: "Add each dog or cat with breed, age, weight and diet. Switch pets anywhere in the app and everything adapts." },
      { group: 'care', icon: '🍽️', bg: 'rgba(255,179,0,.2)', title: 'Daily feeding guide', text: "Treat and bone-broth amounts worked out from your pet's weight, so you never have to guess." },
      { group: 'care', icon: '💉', bg: 'rgba(76,175,80,.18)', title: 'Vaccine and deworming log', text: 'Keep every shot and deworming date in one place, ready to show the vet.' },
      { group: 'care', icon: '🚶', bg: 'rgba(123,31,162,.15)', title: 'Pet services marketplace', text: 'Book dog walkers, daycare and home boarding in your city. Read reviews, see prices up front, and check availability before you book.' },
      { group: 'social', icon: '💞', bg: 'rgba(233,30,99,.14)', title: 'Pet Match', text: 'Swipe to find playdates, walk buddies and mating partners nearby. Your pet shows up by default, with its location rounded to about a kilometre, and you can hide it any time.' },
      { group: 'social', icon: '💬', bg: 'rgba(35,193,195,.18)', title: 'Chat with other pet parents', text: 'When two pets match, the owners can chat. Images disappear after 24 hours, and you can delete chats and messages.' },
      { group: 'social', icon: '🐾', bg: 'rgba(20,44,115,.12)', title: 'Official Doggy Ji chat', text: 'Message the Doggy Ji team for help, and get offers and news from us in one tidy conversation.' },
      { group: 'help', icon: '🩸', bg: 'rgba(211,47,47,.14)', title: 'Blood Donor SOS', text: 'A pet needs blood urgently? Raise an emergency request and nearby registered donors are alerted straight away.' },
      { group: 'help', icon: '🏥', bg: 'rgba(0,150,136,.16)', title: 'Blood bank and donor directory', text: 'Register your healthy pet as a donor, find donors by blood group and city, and look up blood banks near you.' },
      { group: 'app', icon: '🌐', bg: 'rgba(255,179,0,.2)', title: 'Speaks your language', text: 'English, Telugu, Tamil, Kannada and Malayalam, or follow your phone.' },
      { group: 'app', icon: '🌙', bg: 'rgba(20,44,115,.14)', title: 'Light and dark themes', text: 'Easy on the eyes day and night, and it follows your phone setting.' },
      { group: 'app', icon: '📱', bg: 'rgba(35,193,195,.18)', title: 'Built for phones and tablets', text: 'A floating dock on phones and a side menu on tablets, so it feels at home on any screen.' },
      { group: 'app', icon: '🔔', bg: 'rgba(233,30,99,.14)', title: 'Notifications you control', text: 'Order updates, matches, messages and offers, each of which you can switch off.' }
    ];

    $scope.steps = [
      { title: 'Create your account', text: 'Sign up with your email (we send a code to check it) or continue with Google.' },
      { title: 'Add your pet', text: "Tell us your pet's name, breed, age and weight. It takes under a minute." },
      { title: 'Shop, care, connect', text: 'Order healthy treats, track vaccines, book a walker or find a playmate.' }
    ];

    $scope.benefits = [
      { title: 'Everything in one app', text: 'Shopping, health records, services, community and emergency help, instead of five different apps.' },
      { title: 'Made for Indian pet parents', text: 'Prices in rupees, cities across India and five Indian languages.' },
      { title: 'Safe and private', text: 'No card details in the app, approximate locations, private documents and a clear way to delete your data.' },
      { title: 'Backed by Doggy Ji', text: 'The same natural, healthy treats you trust, from the team behind doggyji.com.' }
    ];

    $scope.shots = [
      { img: 'assets/screens/shop.jpg', cap: 'Shop' },
      { img: 'assets/screens/pet-care.jpg', cap: 'Pet care' },
      { img: 'assets/screens/my-pet.jpg', cap: 'My pet' },
      { img: 'assets/screens/feeding.jpg', cap: 'Feeding guide' },
      { img: 'assets/screens/blood-bank.jpg', cap: 'Blood bank' },
      { img: 'assets/screens/profile.jpg', cap: 'Profile' }
    ];

    $scope.faqs = [
      { q: 'Is Doggy Ji free to use?', a: 'Yes. The app is free to download and use. You only pay for products you buy in the shop or for services you book from providers.' },
      { q: 'Which devices does it work on?', a: 'Android phones and tablets. An iPhone version is planned.' },
      { q: 'How do payments work?', a: 'Checkout and payment happen securely on our store. The app never sees or stores your card details.' },
      { q: 'Is my pet’s location public on Pet Match?', a: 'No exact location is ever shown. It is rounded to roughly a kilometre, and you can hide your pet from Pet Match whenever you like.' },
      { q: 'Are the walkers and daycare providers checked?', a: 'Providers apply with their details and documents and are reviewed by our team before they appear. You can read ratings and reviews from other customers.' },
      { q: 'How do I delete my account and data?', a: 'In the app go to Profile, then Delete Account. You can also send us a request from our delete account page. Both are explained there, including what we keep.' },
      { q: 'How can I reach you?', a: 'Email info@doggyji.com or call +91 866 0808 858.' }
    ];
    $scope.toggleFaq = function (f) { f.open = !f.open; };
  }]);

  // Public values: the project address and its publishable key (the same ones the app and the
  // admin portal ship). Access is decided by the signed-in user's own token, not by this key.
  app.constant('BACKEND', {
    url: 'https://jyzyvwdwcrgbtxfqcscg.supabase.co',
    key: 'sb_publishable_089uZjQk0lF9GI7Nfb9mFA_QhgM4kur'
  });

  // Delete-account page.
  //   1. Sign in with the account's email and password (kept in memory only, never stored).
  //   2. Type DELETE and confirm: calls the same `delete-account` function the app uses, which
  //      can only ever delete the signed-in caller.
  // Accounts that only use Google sign-in have no password: they use the app, or the email request.
  app.controller('DeleteCtrl', ['$scope', '$window', '$q', 'SITE', 'BACKEND', function ($scope, $window, $q, SITE, BACKEND) {
    var sb = null;
    function client() {
      if (!sb && $window.supabase && $window.supabase.createClient) {
        sb = $window.supabase.createClient(BACKEND.url, BACKEND.key, {
          auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
        });
      }
      return sb;
    }

    $scope.step = 'signin';          // signin | confirm | done
    $scope.login = { email: '', password: '' };
    $scope.phrase = '';
    $scope.busy = false;
    $scope.error = '';
    $scope.user = null;
    $scope.mailMode = false;

    $scope.signIn = function (form) {
      form.$setSubmitted();
      if (form.$invalid || $scope.busy) { return; }
      var c = client();
      if (!c) { $scope.error = 'This page could not load a required script. Reload it, or use the email request below.'; return; }
      $scope.busy = true; $scope.error = '';
      $q.when(c.auth.signInWithPassword({ email: $scope.login.email.trim(), password: $scope.login.password }))
        .then(function (r) {
          if (r.error || !r.data || !r.data.session) {
            $scope.error = (r.error && /invalid|credentials/i.test(r.error.message))
              ? 'That email or password is not right. If you signed up with Google, you have no password: use the app, or the email request below.'
              : 'Could not sign in. Please try again.';
            return;
          }
          $scope.user = r.data.user;
          $scope.login.password = '';
          $scope.step = 'confirm';
        })
        .catch(function () { $scope.error = 'Could not reach the server. Check your connection, or use the email request below.'; })
        .finally(function () { $scope.busy = false; });
    };

    $scope.canDelete = function () { return !$scope.busy && ($scope.phrase || '').trim().toUpperCase() === 'DELETE'; };

    $scope.deleteNow = function () {
      if (!$scope.canDelete()) { return; }
      var c = client();
      $scope.busy = true; $scope.error = '';
      $q.when(c.auth.getSession()).then(function (r) {
        var session = r.data && r.data.session;
        if (!session) { throw new Error('expired'); }
        return $window.fetch(BACKEND.url + '/functions/v1/delete-account', {
          method: 'POST',
          headers: { Authorization: 'Bearer ' + session.access_token, apikey: BACKEND.key, 'Content-Type': 'application/json' },
          body: '{}'
        });
      }).then(function (res) {
        return $q.when(res.json().catch(function () { return {}; })).then(function (body) {
          if (!res.ok || (body && body.error)) { throw new Error((body && body.error) || 'failed'); }
          $scope.step = 'done';
          c.auth.signOut({ scope: 'local' });
        });
      }).catch(function (e) {
        $scope.error = (e && e.message === 'expired')
          ? 'Your sign-in expired. Sign in again.'
          : (e && e.message && e.message !== 'failed' && e.message !== 'Failed to fetch')
            ? e.message
            : 'The account could not be deleted from this page. Nothing was changed. Try the app, or use the email request below.';
        if (e && e.message === 'expired') { $scope.step = 'signin'; }
      }).finally(function () { $scope.busy = false; });
    };

    $scope.cancel = function () {
      if (sb) { sb.auth.signOut({ scope: 'local' }); }
      $scope.step = 'signin'; $scope.user = null; $scope.phrase = ''; $scope.error = '';
    };

    // Fallback: an email to us, for people who cannot sign in here.
    $scope.reasons = ['I no longer use the app', 'I have privacy concerns', 'I created a second account', 'I am switching to another app', 'Other'];
    $scope.form = { email: '', username: '', reason: '', note: '', confirm: false };
    $scope.sent = false;

    $scope.mailto = function () {
      var f = $scope.form;
      var lines = ['Please delete my Doggy Ji app account and its data.', '', 'Account email: ' + f.email];
      if (f.username) { lines.push('Username: ' + f.username); }
      if (f.reason) { lines.push('Reason (optional): ' + f.reason); }
      if (f.note) { lines.push('Note: ' + f.note); }
      lines.push('', 'I understand this cannot be undone.');
      return 'mailto:' + SITE.email +
        '?subject=' + encodeURIComponent('Delete my Doggy Ji account') +
        '&body=' + encodeURIComponent(lines.join('\n'));
    };

    $scope.submit = function (form) {
      form.$setSubmitted();
      if (form.$invalid || !$scope.form.confirm) { return; }
      $window.location.href = $scope.mailto();
      $scope.sent = true;
    };
  }]);
})();
