UPDATE "public"."NoauiDict"
SET "noauiChhoeTaigiIdList" = ARRAY(
		SELECT "id"
		FROM "public"."NoauiChhoeTaigi"
		WHERE "JoinedDictColumnName" IN (
				'DictWordID',
				'Sube',
				'PojUnicode',
				'PojInput',
				'KipUnicode',
				'KipInput',
				'HanLoTaibunPoj',
				'JitBun',
				'HunluiJitbun',
				'Hunlui',
				'ChhoetaigiPhianChu',
				'ChhehMia',
				'PageNumber'
			)
	)
WHERE ("DictCode" = 'JitpunSitaiTangiMialuiChip');
UPDATE "public"."NoauiDict"
SET "noauiChhoeTaigiIdList" = ARRAY(
		SELECT "id"
		FROM "public"."NoauiChhoeTaigi"
		WHERE "JoinedDictColumnName" IN (
				'DictWordID',
				'Sube',
				'PojUnicode',
				'PojInput',
				'KipUnicode',
				'KipInput',
				'HanbunImPojUnicode',
				'HanbunImPojInput',
				'HanbunImKipUnicode',
				'HanbunImKipInput',
				'HanLoTaibunPoj',
				'KaisoehPoj',
				'KaisoehHanLoPoj',
				'KaisoehKip',
				'ChhoetaigiPhianChu',
				'PageNumber'
			)
	)
WHERE ("DictCode" = 'KamUilimTaigiJitian');
UPDATE "public"."NoauiDict"
SET "noauiChhoeTaigiIdList" = ARRAY(
		SELECT "id"
		FROM "public"."NoauiChhoeTaigi"
		WHERE "JoinedDictColumnName" IN (
				'DictWordID',
				'Sube',
				'PojUnicode',
				'PojUnicodeOthers',
				'PojInput',
				'PojInputOthers',
				'KipUnicode',
				'KipUnicodeOthers',
				'KipInput',
				'KipInputOthers',
				'HanLoTaibunPoj',
				'ChhoetaigiPhianChu',
				'PageNumber'
			)
	)
WHERE ("DictCode" = 'TaijitSinSusu');
UPDATE "public"."NoauiDict"
SET "noauiChhoeTaigiIdList" = ARRAY(
		SELECT "id"
		FROM "public"."NoauiChhoeTaigi"
		WHERE "JoinedDictColumnName" IN (
				'DictWordID',
				'Sube',
				'PojUnicode',
				'PojUnicodeOthers',
				'PojInput',
				'PojInputOthers',
				'KipUnicode',
				'KipUnicodeOthers',
				'KipInput',
				'KipInputOthers',
				'HanLoTaibunPoj',
				'KaisoehHanLoPoj',
				'KaisoehJitbunPoj',
				'LekuHanLoPoj',
				'LekuJitbunPoj',
				'KahToo',
				'ChhoetaigiPhianChu',
				'PageNumber'
			)
	)
WHERE ("DictCode" = 'TaijitToaSutian');
UPDATE "public"."NoauiDict"
SET "noauiChhoeTaigiIdList" = ARRAY(
		SELECT "id"
		FROM "public"."NoauiChhoeTaigi"
		WHERE "JoinedDictColumnName" IN (
				'DictWordID',
				'Sube',
				'PojUnicode',
				'PojUnicodeOthers',
				'PojInput',
				'PojInputOthers',
				'KipUnicode',
				'KipUnicodeOthers',
				'KipInput',
				'KipInputOthers',
				'EngBun',
				'KaisoehEngbun',
				'HoaBun',
				'NounClassifier',
				'LesuPoj',
				'Opposite',
				'LekuPoj',
				'LekuEngbun',
				'LekuHoabun',
				'Confer',
				'ChhoetaigiPhianChu',
				'PageNumber'
			)
	)
WHERE ("DictCode" = 'TaioanPehoeKichhooGiku');
UPDATE "public"."NoauiDict"
SET "noauiChhoeTaigiIdList" = ARRAY(
		SELECT "id"
		FROM "public"."NoauiChhoeTaigi"
		WHERE "JoinedDictColumnName" IN (
				'DictWordID',
				'Sube',
				'PojUnicode',
				'PojInput',
				'KipUnicode',
				'KipInput',
				'HanLoTaibunPoj',
				'KaisoehJitbunPoj',
				'LekuJitbunPoj',
				'Confer',
				'Synonym',
				'Opposite',
				'ChhoetaigiPhianChu',
				'PageNumber',
				'PageNumberChianoePan'
			)
	)
WHERE ("DictCode" = 'TaioangiSiongiongGilui');
UPDATE "public"."NoauiDict"
SET "noauiChhoeTaigiIdList" = ARRAY(
		SELECT "id"
		FROM "public"."NoauiChhoeTaigi"
		WHERE "JoinedDictColumnName" IN (
				'DictWordID',
				'Sube',
				'PojUnicode',
				'PojInput',
				'KipUnicode',
				'KipInput',
				'Abbreviation',
				'NounClassifier',
				'Reduplication',
				'EngBun',
				'HoaBun',
				'Synonym',
				'Confer',
				'ChhoetaigiPhianChu',
				'PageNumber'
			)
	)
WHERE ("DictCode" = 'EmbreeTaiengSutian');
UPDATE "public"."NoauiDict"
SET "noauiChhoeTaigiIdList" = ARRAY(
		SELECT "id"
		FROM "public"."NoauiChhoeTaigi"
		WHERE "JoinedDictColumnName" IN (
				'DictWordID',
				'Sube',
				'PojUnicode',
				'PojInput',
				'KipUnicode',
				'KipInput',
				'EngBun',
				'HoaBun',
				'ChhoetaigiPhianChu',
				'PageNumber'
			)
	)
WHERE ("DictCode" = 'MaryknollTaiengSutian');
UPDATE "public"."NoauiDict"
SET "noauiChhoeTaigiIdList" = ARRAY(
		SELECT "id"
		FROM "public"."NoauiChhoeTaigi"
		WHERE "JoinedDictColumnName" IN (
				'DictWordID',
				'Sube',
				'PojUnicode',
				'PojInput',
				'KipUnicode',
				'KipInput',
				'EngBun',
				'HoaBun',
				'Confer',
				'ChhoetaigiPhianChu',
				'PageNumber'
			)
	)
WHERE ("DictCode" = 'MaryknollEngtaiSutian');
UPDATE "public"."NoauiDict"
SET "noauiChhoeTaigiIdList" = ARRAY(
		SELECT "id"
		FROM "public"."NoauiChhoeTaigi"
		WHERE "JoinedDictColumnName" IN (
				'DictWordID',
				'Sube',
				'PojUnicode',
				'PojUnicodeOthers',
				'PojInput',
				'PojInputOthers',
				'KipUnicode',
				'KipUnicodeOthers',
				'KipInput',
				'KipInputOthers',
				'HanLoTaibunPoj',
				'HoaBun',
				'LaigoanBangchi'
			)
	)
WHERE ("DictCode" = 'TaihoaSoanntengSutian');
UPDATE "public"."NoauiDict"
SET "noauiChhoeTaigiIdList" = ARRAY(
		SELECT "id"
		FROM "public"."NoauiChhoeTaigi"
		WHERE "JoinedDictColumnName" IN (
				'DictWordID',
				'Sube',
				'PojUnicode',
				'PojUnicodeOthers',
				'PojInput',
				'PojInputOthers',
				'LmjUnicode',
				'LmjUnicodeOthers',
				'KipUnicode',
				'KipUnicodeOthers',
				'KipInput',
				'KipInputOthers',
				'ChhoetaigiPhianChu',
				'PageNumber',
				'StoreLink'
			)
	)
WHERE ("DictCode" = 'TJTaigiPehoeSioSutianSekin');
UPDATE "public"."NoauiDict"
SET "noauiChhoeTaigiIdList" = ARRAY(
		SELECT "id"
		FROM "public"."NoauiChhoeTaigi"
		WHERE "JoinedDictColumnName" IN (
				'DictWordID',
				'Sube',
				'PojUnicode',
				'PojUnicodeOthers',
				'PojInput',
				'PojInputOthers',
				'KipUnicode',
				'KipUnicodeOthers',
				'KipInput',
				'KipInputOthers',
				'HanLoTaibunKip',
				'KipDictHanjiTaibunOthers',
				'KaisoehHanLoPoj',
				'HoaBun',
				'KaisoehHanLoKip',
				'KipDictDialects',
				'KipDictWordProperty',
				'Synonym',
				'Opposite',
				'KhehBun',
				'KipDictKaisoehKhehbun',
				'LaigoanBangchi'
			)
	)
WHERE ("DictCode" = 'KauiokPooSutian');
UPDATE "public"."NoauiDict"
SET "noauiChhoeTaigiIdList" = ARRAY(
		SELECT "id"
		FROM "public"."NoauiChhoeTaigi"
		WHERE "JoinedDictColumnName" IN (
				'DictWordID',
				'Sube',
				'PojUnicode',
				'PojInput',
				'KipUnicode',
				'KipInput',
				'HanLoTaibunPoj',
				'HanLoTaibunKip',
				'HoaBun',
				'LaigoanMia',
				'LaigoanBangchi'
			)
	)
WHERE ("DictCode" = 'ITaigi');
UPDATE "public"."NoauiDict"
SET "noauiChhoeTaigiIdList" = ARRAY(
		SELECT "id"
		FROM "public"."NoauiChhoeTaigi"
		WHERE "JoinedDictColumnName" IN (
				'DictWordID',
				'Sube',
				'PojUnicode',
				'PojInput',
				'KipUnicode',
				'KipInput',
				'HanLoTaibunPoj',
				'EngBun',
				'JitBun',
				'HoaBun',
				'ChhoetaigiPhianChu',
				'LaigoanMia',
				'LaigoanBangchi'
			)
	)
WHERE ("DictCode" = 'ChhoetaigiChengpooSutian');
UPDATE "public"."NoauiDict"
SET "noauiChhoeTaigiIdList" = ARRAY(
		SELECT "id"
		FROM "public"."NoauiChhoeTaigi"
		WHERE "JoinedDictColumnName" IN (
				'DictWordID',
				'Sube',
				'PojUnicode',
				'PojInput',
				'KipUnicode',
				'KipInput',
				'HanLoTaibunPoj',
				'SuBeSoatbeng',
				'ChhoetaigiPhianChu',
				'ChhehMia',
				'PageNumber',
				'StoreLink'
			)
	)
WHERE ("DictCode" = 'TaioanBunhakTuchokSekin');
UPDATE "public"."NoauiDict"
SET "noauiChhoeTaigiIdList" = ARRAY(
		SELECT "id"
		FROM "public"."NoauiChhoeTaigi"
		WHERE "JoinedDictColumnName" IN (
				'DictWordID',
				'Sube',
				'PojUnicode',
				'PojInput',
				'KipUnicode',
				'KipInput',
				'HanLoTaibunPoj',
				'EngBun',
				'HoaBun',
				'SoanntengMuitheSekinPoochhiongChuliau',
				'ChhoetaigiPhianChu',
				'SoanntengMuitheSekinHongsangJitki',
				'LaigoanMia',
				'LaigoanBangchi'
			)
	)
WHERE ("DictCode" = 'SoanntengMuitheSekin');
