# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.39.8-alpha.2](https://github.com/nrkno/tv-automation-package-manager/compare/v1.39.8-alpha.1...v1.39.8-alpha.2) (2023-01-12)


### Bug Fixes

* **Quantel:** shorten QUANTEL_TIMEOUT to be lower than INNER_ACTION_TIMEOUT ([0758974](https://github.com/nrkno/tv-automation-package-manager/commit/075897441dd64cba0cb8d0723483e052c08cfecb))





## [1.39.8-alpha.1](https://github.com/nrkno/tv-automation-package-manager/compare/v1.39.8-alpha.0...v1.39.8-alpha.1) (2023-01-12)


### Bug Fixes

* add packageHandle.packageIsInPlace() method, used to signal that a package is in place (or is about to be), so that any scheduled delayRemoval are cleared. ([1a71bc5](https://github.com/nrkno/tv-automation-package-manager/commit/1a71bc5aca80013915a0932f7f2cff9e48e01c12))
* potential issue when using temporaryFilePaths and renaming a file to an already existing file ([17caa32](https://github.com/nrkno/tv-automation-package-manager/commit/17caa32fd1670ca92c06c0657540c5bfbfc6a4a9))





## [1.39.8-alpha.0](https://github.com/nrkno/tv-automation-package-manager/compare/v1.39.7...v1.39.8-alpha.0) (2023-01-12)


### Bug Fixes

* add timestamp to production logs ([9deb2a3](https://github.com/nrkno/tv-automation-package-manager/commit/9deb2a3a3ce12ddaee704e72caccd5d0763e859a))
* increase timeout on quantel ([d0e0379](https://github.com/nrkno/tv-automation-package-manager/commit/d0e03799e7d3fd7218c87c8a505d010be6080ab1))





## [1.39.7](https://github.com/nrkno/tv-automation-package-manager/compare/v1.39.6...v1.39.7) (2023-01-11)


### Bug Fixes

* update quantel-gateway-client ([0f75c1e](https://github.com/nrkno/tv-automation-package-manager/commit/0f75c1e330daee7dec31cc6499213309f3f6708e))





## [1.39.6](https://github.com/nrkno/tv-automation-package-manager/compare/v1.39.5...v1.39.6) (2023-01-09)

**Note:** Version bump only for package package-manager-monorepo





## [1.39.5](https://github.com/nrkno/tv-automation-package-manager/compare/v1.39.4...v1.39.5) (2023-01-09)

**Note:** Version bump only for package package-manager-monorepo





## [1.39.4](https://github.com/nrkno/tv-automation-package-manager/compare/v1.39.4-alpha.0...v1.39.4) (2023-01-04)


### Bug Fixes

* a recursive function needs to be called recursively ([8e06bbf](https://github.com/nrkno/tv-automation-package-manager/commit/8e06bbf097ab9c691b9415571116f5dd618d7881))
* replace dots with underscore in keys in scan results. ([e05f8ef](https://github.com/nrkno/tv-automation-package-manager/commit/e05f8ef05c934453a71e59458392497401a55b9c))


### Features

* push to ghcr ([23b8af4](https://github.com/nrkno/tv-automation-package-manager/commit/23b8af4d8443241d204e08b97b901ea964bdc829))





## [1.39.4-alpha.0](https://github.com/nrkno/tv-automation-package-manager/compare/v1.39.3...v1.39.4-alpha.0) (2022-12-05)


### Bug Fixes

* blackDetectRegex expects  black_duration to be a number with a decimal point ([eb4aaa3](https://github.com/nrkno/tv-automation-package-manager/commit/eb4aaa36ae0a93697f38d263a6f526f82ca2077d))
* blackDetectRegex expects black_duration to be a number with a decimal point ([#19](https://github.com/nrkno/tv-automation-package-manager/issues/19)) ([bb23fba](https://github.com/nrkno/tv-automation-package-manager/commit/bb23fba5dd9ffb97ee8791bd3342bbf0e482aa73))
* support for multiple smartbulls ([bc9db81](https://github.com/nrkno/tv-automation-package-manager/commit/bc9db819a3436774686a19d212c1fe77f89ae3bf))





## [1.39.3](https://github.com/nrkno/tv-automation-package-manager/compare/v1.39.2...v1.39.3) (2022-11-30)


### Bug Fixes

* Update default values to generate larger media preview thumbnails ([f3d0bd7](https://github.com/nrkno/tv-automation-package-manager/commit/f3d0bd764b20753f751e53c49f27abb86f739f07))





## [1.39.1](https://github.com/nrkno/tv-automation-package-manager/compare/v1.39.0...v1.39.1) (2022-09-16)


### Bug Fixes

* a case where multiple QuantelGateway clients where spawned by mistake ([bfb42a5](https://github.com/nrkno/tv-automation-package-manager/commit/bfb42a53e50a0de48cecab3c2275dc3f766c097c))
* minor improvements to the rateLimiter of the file-watcher ([7741626](https://github.com/nrkno/tv-automation-package-manager/commit/77416267c48a1ff528b6d04c6bcb3db756e54cf0))
* smartbull package happened to be replaced by itself ([4d2153a](https://github.com/nrkno/tv-automation-package-manager/commit/4d2153a43b8334e52f7b094b36f69320486803ac))





# [1.39.0](https://github.com/nrkno/tv-automation-package-manager/compare/v1.39.0-in-development.1...v1.39.0) (2022-09-07)


### Bug Fixes

* add chaosMonkey CLI option ([077bb2e](https://github.com/nrkno/tv-automation-package-manager/commit/077bb2e0eb12b51943b37cc6b0b67a00897e1cf2))
* add event handler to correct EventListener ([60328b1](https://github.com/nrkno/tv-automation-package-manager/commit/60328b18df4ef48f82e65f8222491eae9563160d))
* add option for singleApp to not spin up the http-servers ([1ca7588](https://github.com/nrkno/tv-automation-package-manager/commit/1ca75888819b52ac188e8b7c451556cd78d3d4bd))
* add some logging and graceful process handling ([65c0849](https://github.com/nrkno/tv-automation-package-manager/commit/65c08493d0270870993ebf8e11288a3d3eac892f))
* add WorkerStorage to AppContainer, to be used for storing data from workers ([19a1516](https://github.com/nrkno/tv-automation-package-manager/commit/19a15166c9fece12d8474227c4ac0833c115632d))
* allow empty baseUrl for http accessor ([68af3d4](https://github.com/nrkno/tv-automation-package-manager/commit/68af3d436efe02bd4b2d446ffc23a234a6ad2c23))
* better handling (or hack) of the "connect EADDRINUSE" issue, by swallowing the error and try again once ([3cd4dcc](https://github.com/nrkno/tv-automation-package-manager/commit/3cd4dccc381279afe09f9ed4129e67dc427b9da2))
* better handling of errors and child issues in AppContainer ([2dafa16](https://github.com/nrkno/tv-automation-package-manager/commit/2dafa16d1479f8749a820246dfcc560b9a21072e))
* better logging of unhandled promises / warnings ([c4be2c6](https://github.com/nrkno/tv-automation-package-manager/commit/c4be2c677822b1f44ffff10f6bfccd6ff429b404))
* bug fix: invert logic ([2f2db03](https://github.com/nrkno/tv-automation-package-manager/commit/2f2db0389bb7268c9eba4b136bcc469f407ca8fc))
* bug fix: use startRequirement for source, for CopyProxy ([d7cdfee](https://github.com/nrkno/tv-automation-package-manager/commit/d7cdfeebad6d0dc824fb676673bb935acc69d332))
* bug in workerAgent, where the job wasn't cancelled upon timeout in workerAgent ([8cf0020](https://github.com/nrkno/tv-automation-package-manager/commit/8cf002023b366b0b1d711ceff7aac885a0a000ed))
* change priority of deep-scan, so it runs last ([edcf088](https://github.com/nrkno/tv-automation-package-manager/commit/edcf08830445b8b4a59727b3908ab11af907aecc))
* DataStorage: add custom timeout duration for write locks ([32d993d](https://github.com/nrkno/tv-automation-package-manager/commit/32d993d8025c4b2b300f35fd437e1339bc0d497f))
* expectationManager should cancel a workInProgress it thinks has timed out ([4658bd3](https://github.com/nrkno/tv-automation-package-manager/commit/4658bd320e8950ba255990808fc7de95a6bb3e50))
* ffmpeg-issues on Windows ([3a523df](https://github.com/nrkno/tv-automation-package-manager/commit/3a523df3061680afcabb83315bbf9bfc0d4c221a))
* FileShare: fast-path to avoid a timeout issue when many read/write-calls are queued at the same time ([cfe389c](https://github.com/nrkno/tv-automation-package-manager/commit/cfe389c09e31c50c982e590c20741d986b0cd09f))
* fix memory leaks ([e8b5ca6](https://github.com/nrkno/tv-automation-package-manager/commit/e8b5ca641d99db021df7c3fe0a9264ee12f96852))
* graceful process handling ([#9](https://github.com/nrkno/tv-automation-package-manager/issues/9)) ([47ac8e1](https://github.com/nrkno/tv-automation-package-manager/commit/47ac8e16f13803c8273b0768d0bb48e560fbedc2))
* handle errors in killFFMpeg by ignoring them ([43ff037](https://github.com/nrkno/tv-automation-package-manager/commit/43ff037e4e1d4e0f10192c1351164578cfceee26))
* hide ffmpeg banner to decrease log size ([e3a24c2](https://github.com/nrkno/tv-automation-package-manager/commit/e3a24c2c4e11b5e4ea21a9af013dde10ec0e8860))
* Implement a "chaos monkey" that cuts connections between the processes. This is to ensure that reconnections works as they should. ([45b05af](https://github.com/nrkno/tv-automation-package-manager/commit/45b05afde8fc9a755bee9f15385f8f7b59360e2d))
* improve logging, adding categories for logger to make it easier to know where a lig line comes from ([db18a35](https://github.com/nrkno/tv-automation-package-manager/commit/db18a35e841169f0ace1b3d42db2b9932c15f88d))
* improve performance for preview generation ([c761c8b](https://github.com/nrkno/tv-automation-package-manager/commit/c761c8bc6646e67a2fcdaf6ea096db389007a327))
* improve proxy-copy when copying from quantel http-transformer ([8385e3a](https://github.com/nrkno/tv-automation-package-manager/commit/8385e3ad540cac5c31c0d5c8fe1f56496a4d40e3))
* improve some logging/explanations ([f8fd2b4](https://github.com/nrkno/tv-automation-package-manager/commit/f8fd2b4a1d3628cce2c7dd9a0e088be34526c805))
* increase HTTP_TIMEOUT to reduce Socket turnover ([d26ea5d](https://github.com/nrkno/tv-automation-package-manager/commit/d26ea5d1d883794a7fff7e6d818fff0878d0021c))
* increase the delay for waiting for progress updates from jobs ([a836fb8](https://github.com/nrkno/tv-automation-package-manager/commit/a836fb8aad02d33778a33d8eab0dc391e0c3bb99))
* issues with black&freeze detection ([be1adf8](https://github.com/nrkno/tv-automation-package-manager/commit/be1adf84437158295b9c0734265ab2097a09b16e))
* only do a single job per worker ([fc94d3c](https://github.com/nrkno/tv-automation-package-manager/commit/fc94d3c64b468475625adb510290321b52fddf3d))
* Quantel-scans should use the original, not the temporary storage ([149e6d8](https://github.com/nrkno/tv-automation-package-manager/commit/149e6d8790b4c1db84a4514b01fb57dfdb78a51b))
* refactor FFMpeg execution for previews ([2e7e9ea](https://github.com/nrkno/tv-automation-package-manager/commit/2e7e9ea6286192e76e7bbadc58457dcfa8b16f06))
* remove shell for ffmpeg ([0237b05](https://github.com/nrkno/tv-automation-package-manager/commit/0237b057837cfd2db3b92f627a63e0c4f2948896))
* replace execFile with spawn and use maxBuffer in other places ([3816100](https://github.com/nrkno/tv-automation-package-manager/commit/38161003542d6c4c6c63a67b5bb59439df00de9b))
* report progress 0 only after FFMpeg detects duration ([7809d73](https://github.com/nrkno/tv-automation-package-manager/commit/7809d730040259d0687cd413dc2c60dc74a9b815))
* shadowing a global variable is a bad idea ([84d3907](https://github.com/nrkno/tv-automation-package-manager/commit/84d390729ee757ada454f9a8da5b4091aafb2d93))
* switch atem accessor to execFile ([1514967](https://github.com/nrkno/tv-automation-package-manager/commit/1514967a0642df37bcd699a97bab05a3240716ab))
* use HTTP agents for fetch ([bf3cecc](https://github.com/nrkno/tv-automation-package-manager/commit/bf3cecc0533c89867cf80b808a7f944edb174cd2))
* workaround for windows-network-drive not returning all devices. ([46bc210](https://github.com/nrkno/tv-automation-package-manager/commit/46bc2104b0dacb8c0944790f7b631df16b0523e1))
* worker child processes exit with null code ([#11](https://github.com/nrkno/tv-automation-package-manager/issues/11)) ([19ebe9c](https://github.com/nrkno/tv-automation-package-manager/commit/19ebe9c543453b9f3d65abeb071a69010ceca92f))
* Worker: use AppContainer datastore in order to ensure that only one worker is accessing windows drive letters at the same time. ([6c3b58b](https://github.com/nrkno/tv-automation-package-manager/commit/6c3b58b192a5558b6ab7f12178a10625e0af3585))


### Features

* add APPCONTAINER_MAX_KEEPALIVE ([bd75dd8](https://github.com/nrkno/tv-automation-package-manager/commit/bd75dd8e845e4f5137793b36aacbe4e4f17d4dd3))
* add CLI option: considerCPULoad ([6da6ab0](https://github.com/nrkno/tv-automation-package-manager/commit/6da6ab0beab48fb59d29b3fcbfc6a3d0e4aa5de4))
* Apply a rate-limit to the Quantel-http-transformer proxy, to avoid DOS-ing the backend servers ([29a09cf](https://github.com/nrkno/tv-automation-package-manager/commit/29a09cf233bc524d2bf3e52f9d21ceb680363290))
* support for "temporary-storage"; by copying packages to a local PackageContainer, scanning, preview-generation etc can be done quicker. ([31513f3](https://github.com/nrkno/tv-automation-package-manager/commit/31513f3b2b46054c57c8ff6110abd7285d8983c6))
* **worker/accessorHandlers/http(Proxy):** rethrow last timeout error ([9599603](https://github.com/nrkno/tv-automation-package-manager/commit/9599603c8356e2ee20dad770c9d828b4b39f1999))
* terminate ffmpeg/ffprobe gracefully ([202b286](https://github.com/nrkno/tv-automation-package-manager/commit/202b286d7fec92bdd1dd061d99545d4cfec94381))
* use HEAD requests for querying http-servers ([a077126](https://github.com/nrkno/tv-automation-package-manager/commit/a07712643af9c35b8b61de8b4e2113553fc3a259))


### Reverts

* Revert "feat(worker/accessorHandlers/http(Proxy)): add retries to getPackagesToRemove for resiliance" ([f278d2f](https://github.com/nrkno/tv-automation-package-manager/commit/f278d2fad29474bc5e04393d7c6e4e981031e5b5))





# [1.39.0-in-development.1](https://github.com/nrkno/tv-automation-package-manager/compare/v1.39.0-in-development.0...v1.39.0-in-development.1) (2022-02-15)

### Bug Fixes

- add expectationManager data (trackedExpectations) to troubleshoot-data ([7c867ad](https://github.com/nrkno/tv-automation-package-manager/commit/7c867ad24e6a9c40a022da98ea383ccca7479cc9))
- bug fix: previews & thumbnails metadata files wasn't stored propery for non latin file names ([4c48084](https://github.com/nrkno/tv-automation-package-manager/commit/4c48084c80710a4c567373f0ae7bf2a8a857a6b1))
- bug fix: progress wasn't reported for a work in progress ([105d1a1](https://github.com/nrkno/tv-automation-package-manager/commit/105d1a161083d50f8a4032639a7b269fa2cffb5c))
- Don't mark "waiting for orher Expectation" as an error ([2b6413c](https://github.com/nrkno/tv-automation-package-manager/commit/2b6413cfed1eeb97779ca0853329d368dd10f766))
- fix an issue in expectationManager where removed packages where not removed properly ([8dfe60c](https://github.com/nrkno/tv-automation-package-manager/commit/8dfe60c0a4be9807715a009cc66e09c11fbf33c2))
- fs.open read access check ([2f9ab79](https://github.com/nrkno/tv-automation-package-manager/commit/2f9ab794e135e6e9a242fd277ff4f978c8457782))
- Homogenized the headline with the other Sofie repos ([ba69704](https://github.com/nrkno/tv-automation-package-manager/commit/ba69704d913975e87bed3dec468dd02d3056095b))
- http-server: calrify what kind of 404 it returns ([10a070d](https://github.com/nrkno/tv-automation-package-manager/commit/10a070d40a3bf1e86b12bc4d588788f6c2403371))
- improve work queue in expectationManager ([f4b7410](https://github.com/nrkno/tv-automation-package-manager/commit/f4b7410f29939f325963da55e1d406772aa6939b))
- let the worker fix an issue with the filePath automatically. ([0dfec72](https://github.com/nrkno/tv-automation-package-manager/commit/0dfec72fa4ba58b1bc81e0f15ca8987b6db77d91))
- minor fix in error handling of expectation in expectationManager ([b890917](https://github.com/nrkno/tv-automation-package-manager/commit/b89091799b3f16131fe3c4648c65e03278aed619))
- prevReasons wasn't updated properly ([0ec0593](https://github.com/nrkno/tv-automation-package-manager/commit/0ec059322c9bd8238ba6e3af623e97b7e4b6b9bc))
- report status of Package Manager to Core ([4679e08](https://github.com/nrkno/tv-automation-package-manager/commit/4679e08b70fd917ae4e059e22f4b82a48e2491b5))
- revert update of got-dependency, due to incompatible Typescript ([42e8a12](https://github.com/nrkno/tv-automation-package-manager/commit/42e8a12f2bc900bc0a99b4e97b7366618da15260))
- status reporting from workforce ([ea43e87](https://github.com/nrkno/tv-automation-package-manager/commit/ea43e871c5401ac9ee7aa2b428a4f02d436d7d64))
- tidy up urls for http-upload a bit ([753d5dc](https://github.com/nrkno/tv-automation-package-manager/commit/753d5dcad868dc8f3d10bacf598c5a034d85b04b))
- update got-dep, possibly fixing a bug ([26d2ecd](https://github.com/nrkno/tv-automation-package-manager/commit/26d2ecd0273c0384568837e4b445780d6d23ac04))
- Updated headline ([2d3c82f](https://github.com/nrkno/tv-automation-package-manager/commit/2d3c82fdd87b55f12c41c0b6919f31a55b7e9887))

# [1.39.0-in-development.0](https://github.com/nrkno/tv-automation-package-manager/compare/v1.37.0-alpha.1...v1.39.0-in-development.0) (2022-01-27)

### Bug Fixes

- A pretty large rehaul of connection logic. ([4b20139](https://github.com/nrkno/tv-automation-package-manager/commit/4b201394c3074b5601ae6c4452129dde2d7318eb))
- add "HelpfulEventEmitter" to be used instead ot EventEmitter,, because it'll give the developer a warning if they've forgotten to listen to error events. ([fc1b1db](https://github.com/nrkno/tv-automation-package-manager/commit/fc1b1db8f99abbc35bbd39ba87cee870c3df1885))
- add logging for when closing connections due to ping timeouts, and require two subsequent pings to fail before closing ([48cbc0c](https://github.com/nrkno/tv-automation-package-manager/commit/48cbc0c199c514b5047700e7219165ce7abe283b))
- allow deep scanning of audio-only files ([27ebd36](https://github.com/nrkno/tv-automation-package-manager/commit/27ebd3654f1cff3ee97ade486eaae74ca9ef876e))
- AppContainer didn't handle reconnection of apps properly ([21ce287](https://github.com/nrkno/tv-automation-package-manager/commit/21ce287a46f2c810008867c90d6a8ab6458f9cf4))
- better handling of FFScan errors ([dd2d643](https://github.com/nrkno/tv-automation-package-manager/commit/dd2d6439eedfde8d391c092edb4cedd9403549ca))
- bug fix: race condition in messages to Core, that could result in messages being lost ([5a92f26](https://github.com/nrkno/tv-automation-package-manager/commit/5a92f268350b8074b3863c015bb74151e83a4d6c))
- bug in http-server: path.dirname stripped the last folder from basePath. ([2337602](https://github.com/nrkno/tv-automation-package-manager/commit/2337602f45c0474949170982a9107b563c2381d0))
- bug: Quantel clips with no frames showed up as fullfilled ([d986e09](https://github.com/nrkno/tv-automation-package-manager/commit/d986e09fea6a5f30b509df7b0db1af40c047160a))
- create folder if it doesn't exist ([daec566](https://github.com/nrkno/tv-automation-package-manager/commit/daec566c9fcb1f62a69101dab305e7f34dcb0502))
- don't update the PackageOnPackageContainer status in some situations where we don't actually know what state the package actually is in. ([3b41749](https://github.com/nrkno/tv-automation-package-manager/commit/3b417498d8a2518c85cf186154656ca583404cac))
- ExpectationManager: minor updates to expectedPackages (such as priority changes) should not trigger full restarts of expectations ([f7a3de9](https://github.com/nrkno/tv-automation-package-manager/commit/f7a3de9653e679660e6d75b28fcead8473e58805))
- file access errors doesn't need to include stack ([eed5507](https://github.com/nrkno/tv-automation-package-manager/commit/eed5507d909796634905b90720395b629bc58b5a))
- fine-grained priority of accessors ([87f26c0](https://github.com/nrkno/tv-automation-package-manager/commit/87f26c09cb069422d691c509aa8001a6872c7639))
- fix of potential bug where a throw might not be caught ([0dc2753](https://github.com/nrkno/tv-automation-package-manager/commit/0dc2753c0c17d5dc3de3c56315b46c9c01c350b8))
- handle unhandled promises ([13a6f5a](https://github.com/nrkno/tv-automation-package-manager/commit/13a6f5a2a7afde41b06538414d517b132e630edb))
- ignore "ExpectedPackages [...] not found"-errors from core. ([7215cd8](https://github.com/nrkno/tv-automation-package-manager/commit/7215cd8d3cae35d71de90fb8a5e4063066ed49a8))
- ignore "ExpectedPackages [...] not found"-errors from core. ([3dc51da](https://github.com/nrkno/tv-automation-package-manager/commit/3dc51daad8b2f957bdd8c83f23e54b5f081be742))
- improve how loss-of-connections are handled ([60c74fb](https://github.com/nrkno/tv-automation-package-manager/commit/60c74fbb3e3f7ff43b2caf76d85e3c63c7a44718))
- improve stringifyError, to avoid "Error: [object Object]" in logs ([9c9e888](https://github.com/nrkno/tv-automation-package-manager/commit/9c9e88874081b757be3684c7a5604b04e5496ad4))
- in init() methods: wait for the 'connected' event being handled before finishing initializing ([b767e0d](https://github.com/nrkno/tv-automation-package-manager/commit/b767e0d4269e379c316a1a62341d0fd1933f9d6e))
- limit the number of times to re-try removing a Package upon fail ([085c1d9](https://github.com/nrkno/tv-automation-package-manager/commit/085c1d90dc4211036a8a4d8bad5d21e5eb103333))
- only allow Quantel-GUIDs on a certain form, to filter out any invalid ones ([27f0cad](https://github.com/nrkno/tv-automation-package-manager/commit/27f0cad9a6244d704a8fb292d97f5225684aad15))
- pass on certificates into spun-up workers ([b565da5](https://github.com/nrkno/tv-automation-package-manager/commit/b565da5f9dbed7d493447d7f8c175e0ec995b1a4))
- prevent active httpProxy file uploads from timing out ([0c22f69](https://github.com/nrkno/tv-automation-package-manager/commit/0c22f698a1b0ffadfc68a681098eccb40b1b36bc))
- quantel-http-transformer-proxy: When the proxied server returns non-200 codes, we should just pass through the responses ([9e4fe3d](https://github.com/nrkno/tv-automation-package-manager/commit/9e4fe3df5a74dc85a71a7a7d6e7b86c6a7dc3ccb))
- re-export blueprint-integration exports in @sofie-package-manager/api inputApi.ts ([803adc5](https://github.com/nrkno/tv-automation-package-manager/commit/803adc5affbc38c404e710ae1f539907f7717fba))
- receivers will not time out if their methods are unresponsive. ([b08c9ac](https://github.com/nrkno/tv-automation-package-manager/commit/b08c9ac39885d4a26bbdb5f28b3f4785878cb977))
- replace terrible hack with a slightly less terrible hack ([65349cc](https://github.com/nrkno/tv-automation-package-manager/commit/65349ccf0c24d92e6b7401d2fe8c8930e924a13e))
- report various execution-times in getStatus ([c03059f](https://github.com/nrkno/tv-automation-package-manager/commit/c03059fdfebe66ce86ab13be99d3f68bbc85f3cc))
- smartbull scan expectation should have high prio ([7a4fbfe](https://github.com/nrkno/tv-automation-package-manager/commit/7a4fbfebc85f63d656f3bccb7aef9eccad2ff814))
- time out http-fetches properly, to avoid ugly timed out action errors ([a6fee11](https://github.com/nrkno/tv-automation-package-manager/commit/a6fee113d59a5b666f05977225d4a55a6f9e5b09))
- type fix ([092d368](https://github.com/nrkno/tv-automation-package-manager/commit/092d36836af3a600c5d097aea615a1140138566f))
- WebsocketServer: track, emit and log 'error' and 'close' events ([e3ba67f](https://github.com/nrkno/tv-automation-package-manager/commit/e3ba67fc26720809e0b33814be49e50e56e4d348))
- **adapterClient:** add an explicit timeout for websocket function invocations ([bbc3903](https://github.com/nrkno/tv-automation-package-manager/commit/bbc39032d91e75158c8469d5579b2d199d98efc5))
- **fileCopy:** fix copy/paste typo in error message ([943681b](https://github.com/nrkno/tv-automation-package-manager/commit/943681b5bdce8144de56609541a54f73706daaba))
- Worker should remove a cancelled job right away, not wait for the work to actually finish ([cd11a16](https://github.com/nrkno/tv-automation-package-manager/commit/cd11a1678b06b1462f2b2f7c170ff98ef561da95))

### Features

- add CLI argument "--noCore=true" to be used when running without Sofie Core ([1e4b920](https://github.com/nrkno/tv-automation-package-manager/commit/1e4b9203c2df24599c05c07a2566b0bfe207bf14))
- add support for uploading packages to ATEM video switchers ([798ee85](https://github.com/nrkno/tv-automation-package-manager/commit/798ee85e23d4ef9c8cd539ffd17e4bc6a439017b))
- Add the expectationHandler "fileVerify", used to just verify that a file exists, ([adbaf25](https://github.com/nrkno/tv-automation-package-manager/commit/adbaf25177ab6ac7df47199c6be3d1f6de8122ca))
- **fileCopy:** allow reporting progress using a custom event ([020a47f](https://github.com/nrkno/tv-automation-package-manager/commit/020a47f1023b1a1cfd57bf5891969bb8b27ec465))
- **windowsWorker:** allow omitting individual fields from VersionProperty ([3879b2f](https://github.com/nrkno/tv-automation-package-manager/commit/3879b2f96c8be8133a6bd5125d768a74adcd7f92))

# [1.38.0-in-testing.0](https://github.com/nrkno/tv-automation-package-manager/compare/v1.37.0...v1.38.0-in-testing.0) (2021-12-17)

### Bug Fixes

- ignore "ExpectedPackages [...] not found"-errors from core. ([3dc51da](https://github.com/nrkno/tv-automation-package-manager/commit/3dc51daad8b2f957bdd8c83f23e54b5f081be742))
- re-export blueprint-integration exports in @sofie-package-manager/api inputApi.ts ([803adc5](https://github.com/nrkno/tv-automation-package-manager/commit/803adc5affbc38c404e710ae1f539907f7717fba))

# [1.38.0-alpha.0](https://github.com/nrkno/tv-automation-package-manager/compare/v1.37.0...v1.38.0-alpha.0) (2021-12-17)

### Bug Fixes

- ignore "ExpectedPackages [...] not found"-errors from core. ([3dc51da](https://github.com/nrkno/tv-automation-package-manager/commit/3dc51daad8b2f957bdd8c83f23e54b5f081be742))
- re-export blueprint-integration exports in @sofie-package-manager/api inputApi.ts ([803adc5](https://github.com/nrkno/tv-automation-package-manager/commit/803adc5affbc38c404e710ae1f539907f7717fba))

# [1.37.0](https://github.com/nrkno/tv-automation-package-manager/compare/v1.37.0-alpha.1...v1.37.0) (2021-12-17)

### Bug Fixes

- A pretty large rehaul of connection logic. ([4b20139](https://github.com/nrkno/tv-automation-package-manager/commit/4b201394c3074b5601ae6c4452129dde2d7318eb))
- add "HelpfulEventEmitter" to be used instead ot EventEmitter,, because it'll give the developer a warning if they've forgotten to listen to error events. ([fc1b1db](https://github.com/nrkno/tv-automation-package-manager/commit/fc1b1db8f99abbc35bbd39ba87cee870c3df1885))
- add logging for when closing connections due to ping timeouts, and require two subsequent pings to fail before closing ([48cbc0c](https://github.com/nrkno/tv-automation-package-manager/commit/48cbc0c199c514b5047700e7219165ce7abe283b))
- AppContainer didn't handle reconnection of apps properly ([21ce287](https://github.com/nrkno/tv-automation-package-manager/commit/21ce287a46f2c810008867c90d6a8ab6458f9cf4))
- bug fix: race condition in messages to Core, that could result in messages being lost ([5a92f26](https://github.com/nrkno/tv-automation-package-manager/commit/5a92f268350b8074b3863c015bb74151e83a4d6c))
- bug: Quantel clips with no frames showed up as fullfilled ([d986e09](https://github.com/nrkno/tv-automation-package-manager/commit/d986e09fea6a5f30b509df7b0db1af40c047160a))
- don't update the PackageOnPackageContainer status in some situations where we don't actually know what state the package actually is in. ([3b41749](https://github.com/nrkno/tv-automation-package-manager/commit/3b417498d8a2518c85cf186154656ca583404cac))
- ExpectationManager: minor updates to expectedPackages (such as priority changes) should not trigger full restarts of expectations ([f7a3de9](https://github.com/nrkno/tv-automation-package-manager/commit/f7a3de9653e679660e6d75b28fcead8473e58805))
- file access errors doesn't need to include stack ([eed5507](https://github.com/nrkno/tv-automation-package-manager/commit/eed5507d909796634905b90720395b629bc58b5a))
- fine-grained priority of accessors ([87f26c0](https://github.com/nrkno/tv-automation-package-manager/commit/87f26c09cb069422d691c509aa8001a6872c7639))
- fix of potential bug where a throw might not be caught ([0dc2753](https://github.com/nrkno/tv-automation-package-manager/commit/0dc2753c0c17d5dc3de3c56315b46c9c01c350b8))
- handle unhandled promises ([13a6f5a](https://github.com/nrkno/tv-automation-package-manager/commit/13a6f5a2a7afde41b06538414d517b132e630edb))
- improve how loss-of-connections are handled ([60c74fb](https://github.com/nrkno/tv-automation-package-manager/commit/60c74fbb3e3f7ff43b2caf76d85e3c63c7a44718))
- improve stringifyError, to avoid "Error: [object Object]" in logs ([9c9e888](https://github.com/nrkno/tv-automation-package-manager/commit/9c9e88874081b757be3684c7a5604b04e5496ad4))
- in init() methods: wait for the 'connected' event being handled before finishing initializing ([b767e0d](https://github.com/nrkno/tv-automation-package-manager/commit/b767e0d4269e379c316a1a62341d0fd1933f9d6e))
- limit the number of times to re-try removing a Package upon fail ([085c1d9](https://github.com/nrkno/tv-automation-package-manager/commit/085c1d90dc4211036a8a4d8bad5d21e5eb103333))
- pass on certificates into spun-up workers ([b565da5](https://github.com/nrkno/tv-automation-package-manager/commit/b565da5f9dbed7d493447d7f8c175e0ec995b1a4))
- quantel-http-transformer-proxy: When the proxied server returns non-200 codes, we should just pass through the responses ([9e4fe3d](https://github.com/nrkno/tv-automation-package-manager/commit/9e4fe3df5a74dc85a71a7a7d6e7b86c6a7dc3ccb))
- receivers will not time out if their methods are unresponsive. ([b08c9ac](https://github.com/nrkno/tv-automation-package-manager/commit/b08c9ac39885d4a26bbdb5f28b3f4785878cb977))
- report various execution-times in getStatus ([c03059f](https://github.com/nrkno/tv-automation-package-manager/commit/c03059fdfebe66ce86ab13be99d3f68bbc85f3cc))
- type fix ([092d368](https://github.com/nrkno/tv-automation-package-manager/commit/092d36836af3a600c5d097aea615a1140138566f))
- WebsocketServer: track, emit and log 'error' and 'close' events ([e3ba67f](https://github.com/nrkno/tv-automation-package-manager/commit/e3ba67fc26720809e0b33814be49e50e56e4d348))
- Worker should remove a cancelled job right away, not wait for the work to actually finish ([cd11a16](https://github.com/nrkno/tv-automation-package-manager/commit/cd11a1678b06b1462f2b2f7c170ff98ef561da95))

# [1.37.0-alpha.1](https://github.com/nrkno/tv-automation-package-manager/compare/v1.37.0-alpha.0...v1.37.0-alpha.1) (2021-11-05)

### Bug Fixes

- better handling of when sending statuses to Core fails ([5d5f532](https://github.com/nrkno/tv-automation-package-manager/commit/5d5f532aa9b137bd5fd44489a5ad390b0ce14de9))
- don't try to send updates to core when disconnected, queue them to be sent upon reconnection instead ([1749207](https://github.com/nrkno/tv-automation-package-manager/commit/17492077063b1e9c7805d7813a0b8e571ec3826e))

# [1.37.0-alpha.0](https://github.com/nrkno/tv-automation-package-manager/compare/v1.1.1...v1.37.0-alpha.0) (2021-11-05)

### Bug Fixes

- add CLI option to multiply worker cost ([3d4f131](https://github.com/nrkno/tv-automation-package-manager/commit/3d4f131c099d0f2c799016929148930f938ce603))
- add workforcePort CLI option for singleApp ([aba69cb](https://github.com/nrkno/tv-automation-package-manager/commit/aba69cb4998cd92ad8b88316c79a1f99a6e266b4))
- bug fix: quantel clone by title didn't work at all ([b502862](https://github.com/nrkno/tv-automation-package-manager/commit/b502862de54cc7b9510e671220ded2127881a5cf))
- bug fix: undefined properties could mess with spread operator ([b8bd22b](https://github.com/nrkno/tv-automation-package-manager/commit/b8bd22bb35141a3ad3391a9c4a2b12b805eca447))
- check for status change while ABORTING ([b36c6e0](https://github.com/nrkno/tv-automation-package-manager/commit/b36c6e0ea7cc61b6de5d72d1868c66e95c5b6488))
- check if fileflowURL is set on accessor when selecting the best accessor ([abca120](https://github.com/nrkno/tv-automation-package-manager/commit/abca120658b7f4b849a487c8d8aa2f7ae8e816c0))
- disable drive mapping when using FileFlow ([7800b82](https://github.com/nrkno/tv-automation-package-manager/commit/7800b826f662a7fe9e558ac36c14deadd428bef9))
- don't generate expectations for packages with no source or target ([b6a45c2](https://github.com/nrkno/tv-automation-package-manager/commit/b6a45c29162be94389213085f98519aca816a45f))
- expedite handling of RESTARTED & REMOVED ([ff6ee72](https://github.com/nrkno/tv-automation-package-manager/commit/ff6ee728bcd68901a4c1560484c602dda4ec73f1))
- Fileflow exports correctly created ([b1f8547](https://github.com/nrkno/tv-automation-package-manager/commit/b1f85473ef0d8ce126e12b5a153f6349227128c7))
- fileflow only supports Quantel to File_Share ([a79664d](https://github.com/nrkno/tv-automation-package-manager/commit/a79664d9a46a3ca868cc23685de50b9fc79ec71b))
- guid / title may be set in Quantel Accessor ([98dcb53](https://github.com/nrkno/tv-automation-package-manager/commit/98dcb539dfb7c4c1a4a0340c5833f491fced3ab4))
- if a packages shows up multiple times (with different targets), side-effects are only needed for one of them ([2e06d03](https://github.com/nrkno/tv-automation-package-manager/commit/2e06d03442fc54651e421db3518e169502dad4bc))
- improve how REMOVED, ABORTED & RESTARTED states are set ([7326a5f](https://github.com/nrkno/tv-automation-package-manager/commit/7326a5f159fc197a01d23afa7e04080de5cf2403))
- improve logging for requestResources methods ([8dd3b62](https://github.com/nrkno/tv-automation-package-manager/commit/8dd3b6246dbdedafcec99931edb9a2d776b9f61a))
- listen to errors from Koa ([6f2cd1d](https://github.com/nrkno/tv-automation-package-manager/commit/6f2cd1d61cb09eb26fd93738d51b4d8e2e03b856))
- more forgiving comparison of resource/network ids ([e3041df](https://github.com/nrkno/tv-automation-package-manager/commit/e3041df8741ed528263beddc7663eae3c068f7c5))
- Quantel: handle edge case when title of clip has been changed ([e9d1dca](https://github.com/nrkno/tv-automation-package-manager/commit/e9d1dca9805257357ff5463854614e289e7bd5c6))
- refactor and fix: use guid & title from content or accessor interchangeably ([171b396](https://github.com/nrkno/tv-automation-package-manager/commit/171b3963a149ec0e7288c726f695ab28f7e33420))

### Features

- add fileflow profile support for Quantel Fileflow copy ([38cfbfa](https://github.com/nrkno/tv-automation-package-manager/commit/38cfbfa3402ac3a80e1c9efc5e70ae20243ecc7e))
- implement Quantel Fileflow Copy expectation ([3844534](https://github.com/nrkno/tv-automation-package-manager/commit/3844534915868afa387fcc06fa55d0e44060bc77))
- refactor Quantel FileFlow to just be a special case within FileCopy [WIP] ([853e7e3](https://github.com/nrkno/tv-automation-package-manager/commit/853e7e39426b2828b3d4922df737fcb2f92e2149))

# [1.1.0-alpha.0](https://github.com/nrkno/tv-automation-package-manager/compare/v1.0.2...v1.1.0-alpha.0) (2021-09-24)

### Bug Fixes

- add fields to repost status: priority & prevStatusReasons ([e805c61](https://github.com/nrkno/tv-automation-package-manager/commit/e805c61d1b31cf483889dc80f681219e17e89793))
- add method for cleaning out packageContainerPackage statuses upon startup ([d12c163](https://github.com/nrkno/tv-automation-package-manager/commit/d12c1633fc012811ae96b3415f2a9cecd0bbf61c))
- add methods to restart packageContainer monitors ([6dda1bb](https://github.com/nrkno/tv-automation-package-manager/commit/6dda1bb419ca3dc8c30bc8303aa8cf4e20cf1b7f))
- also spin up resources based on packageContainers, not just expectations ([3dc6190](https://github.com/nrkno/tv-automation-package-manager/commit/3dc6190e80de494fdbbe08d3f75696f9c1eef7b3))
- bug fix: expectationManager tried to always scale up ([838a51b](https://github.com/nrkno/tv-automation-package-manager/commit/838a51b68aa8c09766c990cbadebca5245353b6f))
- bug fix: non-writeable packageContainers didn't get their statuses reported back to Core ([f906d70](https://github.com/nrkno/tv-automation-package-manager/commit/f906d7077cdd962c1ae69e9409b4604bbbdc5466))
- expectationManager: improve how expectation error-statuses are handled, better querying for available workers etc ([757f853](https://github.com/nrkno/tv-automation-package-manager/commit/757f8538fbd4327e599b499e23d2652102f91964))
- send packageContainerPackage statuses on all statuses ([190c9e5](https://github.com/nrkno/tv-automation-package-manager/commit/190c9e54f09c207fbd8b309f4c1ff29dc328129d))

### Features

- change how monitors are setup, lifetime etc. Add MonitorInProgress and report statuses of monitors and packageContainers back to Core ([5cafa70](https://github.com/nrkno/tv-automation-package-manager/commit/5cafa70bd29ef46ac5dd50d29651d5a53ad32a08))

## [1.1.1](https://github.com/nrkno/tv-automation-package-manager/compare/v1.1.0...v1.1.1) (2021-09-30)

### Bug Fixes

- add fields to repost status: priority & prevStatusReasons ([e805c61](https://github.com/nrkno/tv-automation-package-manager/commit/e805c61d1b31cf483889dc80f681219e17e89793))
- add method for cleaning out packageContainerPackage statuses upon startup ([d12c163](https://github.com/nrkno/tv-automation-package-manager/commit/d12c1633fc012811ae96b3415f2a9cecd0bbf61c))
- add methods to restart packageContainer monitors ([6dda1bb](https://github.com/nrkno/tv-automation-package-manager/commit/6dda1bb419ca3dc8c30bc8303aa8cf4e20cf1b7f))
- also spin up resources based on packageContainers, not just expectations ([3dc6190](https://github.com/nrkno/tv-automation-package-manager/commit/3dc6190e80de494fdbbe08d3f75696f9c1eef7b3))
- bug fix: expectationManager tried to always scale up ([838a51b](https://github.com/nrkno/tv-automation-package-manager/commit/838a51b68aa8c09766c990cbadebca5245353b6f))
- bug fix: non-writeable packageContainers didn't get their statuses reported back to Core ([f906d70](https://github.com/nrkno/tv-automation-package-manager/commit/f906d7077cdd962c1ae69e9409b4604bbbdc5466))
- bug fix: set the priority of the smartbull clip ([b74f239](https://github.com/nrkno/tv-automation-package-manager/commit/b74f239ddafd0494c96669d45a1d12e8746df095))
- clarify priorities ([8351e8b](https://github.com/nrkno/tv-automation-package-manager/commit/8351e8b19cf6629e30f83476876f6ee7cd1fb072))
- expectationManager: improve how expectation error-statuses are handled, better querying for available workers etc ([757f853](https://github.com/nrkno/tv-automation-package-manager/commit/757f8538fbd4327e599b499e23d2652102f91964))
- send packageContainerPackage statuses on all statuses ([190c9e5](https://github.com/nrkno/tv-automation-package-manager/commit/190c9e54f09c207fbd8b309f4c1ff29dc328129d))
- add option to delay removal of PackageInfo ([64af17f](https://github.com/nrkno/tv-automation-package-manager/commit/64af17fb2d30c5231e072afb82b7dafc55295c28))

# [1.1.0](https://github.com/nrkno/tv-automation-package-manager/compare/v1.0.2...v1.1.0) (2021-09-28)

### Bug Fixes

- better handling of timed out jobs ([82bb9fc](https://github.com/nrkno/tv-automation-package-manager/commit/82bb9fc40f95636d6352a563f0d21fbcff59556e))
- bug fix: set the priority of the smartbull clip ([b74f239](https://github.com/nrkno/tv-automation-package-manager/commit/b74f239ddafd0494c96669d45a1d12e8746df095))
- clarify priorities ([8351e8b](https://github.com/nrkno/tv-automation-package-manager/commit/8351e8b19cf6629e30f83476876f6ee7cd1fb072))

### Features

- change how monitors are setup, lifetime etc. Add MonitorInProgress and report statuses of monitors and packageContainers back to Core ([5cafa70](https://github.com/nrkno/tv-automation-package-manager/commit/5cafa70bd29ef46ac5dd50d29651d5a53ad32a08))
- back-port release37-features onto release36 ([e2955ec](https://github.com/nrkno/tv-automation-package-manager/commit/e2955ec72a545756c5e270141530c158d27d08e8))

## [1.0.2](https://github.com/nrkno/tv-automation-package-manager/compare/v1.0.1...v1.0.2) (2021-09-15)

### Bug Fixes

- all handlers that handle http_proxy should also be able to handle http ([feac6d7](https://github.com/nrkno/tv-automation-package-manager/commit/feac6d7dc03817f8ce01594ef2070c7bcb955834))
- previews should support the source-types file-share and http_proxy ([982ff4f](https://github.com/nrkno/tv-automation-package-manager/commit/982ff4f396be8a676a1498c5241ac912a7e3afb7))
