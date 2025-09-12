declare namespace Components {
    namespace Schemas {
        export interface ActivationTeam {
            type?: /**
             * * `Informatiebijeenkomst` - INFORMATIEBIJEENKOMST
             * * `Ledenvergadering` - LEDENVERGADERING
             */
            ActivationTeamTypeEnum;
            subject?: string | null;
            meeting_date?: string | null; // date
        }
        /**
         * * `Informatiebijeenkomst` - INFORMATIEBIJEENKOMST
         * * `Ledenvergadering` - LEDENVERGADERING
         */
        export type ActivationTeamTypeEnum = "Informatiebijeenkomst" | "Ledenvergadering";
        /**
         * * `Energieadvies` - ENERGY_ADVICE
         * * `Haalbaarheidsonderzoek` - HBO
         * * `Cursus` - COURSE
         */
        export type AdviceTypeEnum = "Energieadvies" | "Haalbaarheidsonderzoek" | "Cursus";
        export interface Apartment {
            straatnaam?: string | null;
            huisnummer?: number | null;
            huisletter?: string | null;
            huisnummertoevoeging?: string | null;
            postcode?: string | null;
            woonplaats?: string | null;
            adresseerbaarobject_id?: string | null;
            nummeraanduiding_id?: string | null;
        }
        /**
         * * `Advies` - ADVICE
         * * `Activatieteam` - ACTIVATIONTEAM
         */
        export type ApplicationTypeEnum = "Advies" | "Activatieteam";
        export type BlankEnum = "";
        export interface BpmnModel {
            version: string;
            file_name: string;
            model: string;
        }
        export interface Case {
            activation_team?: ActivationTeam;
            advice_type?: null & (/**
             * * `Energieadvies` - ENERGY_ADVICE
             * * `Haalbaarheidsonderzoek` - HBO
             * * `Cursus` - COURSE
             */
            AdviceTypeEnum | BlankEnum | NullEnum);
            application_type?: /**
             * * `Advies` - ADVICE
             * * `Activatieteam` - ACTIVATIONTEAM
             */
            ApplicationTypeEnum;
            created?: string; // date-time
            description?: string | null;
            end_date?: string | null; // date
            homeowner_association: CaseHomeownerAssociation;
            id: number;
            legacy_id?: string | null;
            prefixed_dossier_id?: string | null;
            status: string;
            workflows: CaseWorkflow[];
        }
        export interface CaseAdvisor {
            id: number;
            name: string;
        }
        export interface CaseClose {
            id: number;
            case_user_task_id?: string;
            description?: string | null;
            created: string; // date-time
            case: number;
            reason: number;
        }
        export interface CaseCloseReason {
            id: number;
            name: string;
            is_successful: boolean;
        }
        export interface CaseCreate {
            advice_type?: null & (/**
             * * `Energieadvies` - ENERGY_ADVICE
             * * `Haalbaarheidsonderzoek` - HBO
             * * `Cursus` - COURSE
             */
            AdviceTypeEnum | BlankEnum | NullEnum);
            application_type?: /**
             * * `Advies` - ADVICE
             * * `Activatieteam` - ACTIVATIONTEAM
             */
            ApplicationTypeEnum;
            contacts?: Contact[];
            description?: string | null;
            homeowner_association?: number | null;
            id: number;
            legacy_id?: string | null;
            activation_team?: ActivationTeam;
        }
        export interface CaseDocument {
            id: number;
            case: number;
            document: string; // uri
            name: string;
            created: string; // date-time
        }
        export interface CaseDocumentNameUpdate {
            name: string;
        }
        export interface CaseDocumentWithTask {
            id: number;
            case: number;
            document: string; // uri
            name: string;
            created: string; // date-time
            case_user_task_id?: string | null;
        }
        export interface CaseEvent {
            id: number;
            event_values: {
                [name: string]: any;
            };
            event_variables: {
                [name: string]: any;
            };
            created: string; // date-time
            type: /**
             * * `CASE` - CASE
             * * `CASE_CLOSE` - CASE_CLOSE
             * * `GENERIC_TASK` - GENERIC_TASK
             */
            CaseEventTypeEnum;
            emitter_id: number;
            case: number;
        }
        /**
         * * `CASE` - CASE
         * * `CASE_CLOSE` - CASE_CLOSE
         * * `GENERIC_TASK` - GENERIC_TASK
         */
        export type CaseEventTypeEnum = "CASE" | "CASE_CLOSE" | "GENERIC_TASK";
        export interface CaseHomeownerAssociation {
            id: number;
            name: string;
        }
        export interface CaseList {
            created?: string; // date-time
            end_date?: string | null; // date
            homeowner_association: CaseHomeownerAssociation;
            id: number;
            legacy_id?: string | null;
            prefixed_dossier_id?: string | null;
            status: string;
            updated: string; // date-time
        }
        export interface CaseStatus {
            name: string;
        }
        export interface CaseUserTask {
            id: number;
            task_id: string; // uuid
            task_name: string;
            name: string;
            form?: null;
            roles?: string[] | null;
            due_date: string; // date-time
            owner?: number | null;
            created: string; // date-time
            updated: string; // date-time
            completed?: boolean;
            case: number;
            homeowner_association: string;
            initiated_by: string;
            /**
             * Indicates whether this task requires review by another user.
             */
            requires_review?: boolean;
        }
        export interface CaseUserTaskList {
            id: number;
            name: string;
            case: number;
            homeowner_association: string;
            prefixed_dossier_id: string;
            created: string; // date-time
        }
        export interface CaseWorkflow {
            id: number;
            case?: number | null;
            tasks: CaseUserTask[];
            completed?: boolean;
        }
        export interface Contact {
            fullname: string;
            email: string; // email
            phone: string;
            role: string;
            id: number;
        }
        export interface District {
            id: number;
            name: string;
            neighborhoods: Neighborhood[];
        }
        export interface GenericCompletedTaskCreate {
            id: number;
            case_user_task_id: string;
            case: number;
            variables: any;
            description?: string;
            date_added: string; // date-time
        }
        export interface HomeownerAssociation {
            beschermd_stadsdorpsgezicht?: string | null;
            build_year: number;
            contacts: Nested[];
            district: string;
            id: number;
            is_priority_neighborhood: boolean;
            is_small: boolean;
            kvk_nummer?: string | null;
            ligt_in_beschermd_gebied?: string | null;
            monument_status?: string | null;
            name: string;
            neighborhood: string;
            number_of_apartments: number;
            owners?: Owner[];
            wijk: string;
            zip_code?: string | null;
        }
        export interface MijnAmsterdam {
            bag_id: string;
            beschermd_stadsdorpsgezicht?: string | null;
            build_year: number;
            district?: string | null;
            kvk_nummer?: string | null;
            ligt_in_beschermd_gebied?: string | null;
            monument_status?: string | null;
            name: string;
            neighborhood?: string | null;
            number_of_apartments: number;
            wijk?: string | null;
            zip_code?: string | null;
            cases: MijnAmsterdamCaseList[];
        }
        export interface MijnAmsterdamCaseList {
            activation_team?: ActivationTeam;
            advice_type?: null & (/**
             * * `Energieadvies` - ENERGY_ADVICE
             * * `Haalbaarheidsonderzoek` - HBO
             * * `Cursus` - COURSE
             */
            AdviceTypeEnum | BlankEnum | NullEnum);
            application_type?: /**
             * * `Advies` - ADVICE
             * * `Activatieteam` - ACTIVATIONTEAM
             */
            ApplicationTypeEnum;
            created?: string; // date-time
            end_date?: string | null; // date
            homeowner_association: CaseHomeownerAssociation;
            id: number;
            legacy_id?: string | null;
            prefixed_dossier_id?: string | null;
            status: string;
            updated: string; // date-time
        }
        export interface Neighborhood {
            id: number;
            name: string;
        }
        export interface Nested {
            id: number;
            email: string; // email
            phone: string;
            fullname: string;
            role: string;
            homeowner_associations?: number[];
        }
        export type NullEnum = null;
        export interface Owner {
            type: string;
            name?: string | null;
            number_of_apartments: number;
        }
        export interface PaginatedCaseCloseList {
            /**
             * example:
             * 123
             */
            count: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results: CaseClose[];
        }
        export interface PaginatedCaseListList {
            /**
             * example:
             * 123
             */
            count: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results: CaseList[];
        }
        export interface PaginatedCaseStatusList {
            /**
             * example:
             * 123
             */
            count: number;
            /**
             * example:
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
             */
            previous?: string | null; // uri
            results: CaseStatus[];
        }
        export interface PaginatedCaseUserTaskListList {
            /**
             * example:
             * 123
             */
            count: number;
            /**
             * example:
             * http://api.example.org/accounts/?page=4
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?page=2
             */
            previous?: string | null; // uri
            results: CaseUserTaskList[];
        }
        export interface PaginatedDistrictList {
            /**
             * example:
             * 123
             */
            count: number;
            /**
             * example:
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
             */
            previous?: string | null; // uri
            results: District[];
        }
        export interface PaginatedHomeownerAssociationList {
            /**
             * example:
             * 123
             */
            count: number;
            /**
             * example:
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
             */
            previous?: string | null; // uri
            results: HomeownerAssociation[];
        }
        export interface PaginatedNeighborhoodList {
            /**
             * example:
             * 123
             */
            count: number;
            /**
             * example:
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
             */
            previous?: string | null; // uri
            results: Neighborhood[];
        }
        export interface PaginatedWijkList {
            /**
             * example:
             * 123
             */
            count: number;
            /**
             * example:
             * http://api.example.org/accounts/?offset=400&limit=100
             */
            next?: string | null; // uri
            /**
             * example:
             * http://api.example.org/accounts/?offset=200&limit=100
             */
            previous?: string | null; // uri
            results: Wijk[];
        }
        export interface PatchedCaseDocumentNameUpdate {
            name?: string;
        }
        export interface PatchedUpdateCaseAdvisor {
            advisor?: number;
        }
        export interface StartWorkflow {
            workflow_option_id: number;
        }
        export interface Wijk {
            id: number;
            name: string;
        }
        export interface WorkflowOption {
            id: number;
            name: string;
            message_name: string;
        }
    }
}
declare namespace Paths {
    namespace AddressHomeownerAssociationRetrieve {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.HomeownerAssociation;
        }
    }
    namespace AddressMijnAmsterdamRetrieve {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.MijnAmsterdam;
        }
    }
    namespace AdvisorsList {
        namespace Responses {
            export type $200 = Components.Schemas.CaseAdvisor[];
        }
    }
    namespace AdvisorsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CaseAdvisor;
        }
    }
    namespace ApiSchemaRetrieve {
        namespace Parameters {
            export type Format = "json" | "yaml";
            export type Lang = "af" | "ar" | "ar-dz" | "ast" | "az" | "be" | "bg" | "bn" | "br" | "bs" | "ca" | "ckb" | "cs" | "cy" | "da" | "de" | "dsb" | "el" | "en" | "en-au" | "en-gb" | "eo" | "es" | "es-ar" | "es-co" | "es-mx" | "es-ni" | "es-ve" | "et" | "eu" | "fa" | "fi" | "fr" | "fy" | "ga" | "gd" | "gl" | "he" | "hi" | "hr" | "hsb" | "hu" | "hy" | "ia" | "id" | "ig" | "io" | "is" | "it" | "ja" | "ka" | "kab" | "kk" | "km" | "kn" | "ko" | "ky" | "lb" | "lt" | "lv" | "mk" | "ml" | "mn" | "mr" | "ms" | "my" | "nb" | "ne" | "nl" | "nn" | "os" | "pa" | "pl" | "pt" | "pt-br" | "ro" | "ru" | "sk" | "sl" | "sq" | "sr" | "sr-latn" | "sv" | "sw" | "ta" | "te" | "tg" | "th" | "tk" | "tr" | "tt" | "udm" | "ug" | "uk" | "ur" | "uz" | "vi" | "zh-hans" | "zh-hant";
        }
        export interface QueryParameters {
            format?: Parameters.Format;
            lang?: Parameters.Lang;
        }
        namespace Responses {
            export interface $200 {
                [name: string]: any;
            }
        }
    }
    namespace BpmnModelsFileRetrieve {
        namespace Parameters {
            export type ModelName = string; // ^[^/]+$
            export type Version = string; // ^[^/]+$
        }
        export interface PathParameters {
            model_name: Parameters.ModelName /* ^[^/]+$ */;
            version: Parameters.Version /* ^[^/]+$ */;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace BpmnModelsList {
        namespace Responses {
            export type $200 = string[];
        }
    }
    namespace BpmnModelsList2 {
        namespace Parameters {
            export type ModelName = string; // ^[^/]+$
        }
        export interface PathParameters {
            model_name: Parameters.ModelName /* ^[^/]+$ */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.BpmnModel[];
        }
    }
    namespace CaseCloseCreate {
        export type RequestBody = Components.Schemas.CaseClose;
        namespace Responses {
            export type $201 = Components.Schemas.CaseClose;
        }
    }
    namespace CaseCloseList {
        namespace Parameters {
            export type Page = number;
            export type PageSize = number;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            page_size?: Parameters.PageSize;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseCloseList;
        }
    }
    namespace CaseCloseReasonsRetrieve {
        namespace Responses {
            export type $200 = Components.Schemas.CaseCloseReason;
        }
    }
    namespace CaseCloseRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CaseClose;
        }
    }
    namespace CaseStatusesList {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseStatusList;
        }
    }
    namespace CaseStatusesRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CaseStatus;
        }
    }
    namespace CasesAdvisorPartialUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.PatchedUpdateCaseAdvisor;
        namespace Responses {
            export type $200 = string;
        }
    }
    namespace CasesAdvisorsList {
        namespace Parameters {
            export type AdviceType = "Cursus" | "Energieadvies" | "Haalbaarheidsonderzoek";
            export type Advisor = number[];
            export type ApplicationType = "Activatieteam" | "Advies";
            export type Closed = boolean;
            export type CreatedRangeAfter = string; // date
            export type CreatedRangeBefore = string; // date
            export type District = string[];
            export type EndDateRangeAfter = string; // date
            export type EndDateRangeBefore = string; // date
            export type Id = number;
            export type IsSmallHoa = boolean;
            export type Neighborhood = string[];
            export type Ordering = string;
            export type Search = string;
            export type Status = number[];
            export type Wijk = string[];
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            advice_type?: Parameters.AdviceType;
            advisor?: Parameters.Advisor;
            application_type?: Parameters.ApplicationType;
            closed?: Parameters.Closed;
            created_range_after?: Parameters.CreatedRangeAfter /* date */;
            created_range_before?: Parameters.CreatedRangeBefore /* date */;
            district?: Parameters.District;
            end_date_range_after?: Parameters.EndDateRangeAfter /* date */;
            end_date_range_before?: Parameters.EndDateRangeBefore /* date */;
            is_small_hoa?: Parameters.IsSmallHoa;
            neighborhood?: Parameters.Neighborhood;
            ordering?: Parameters.Ordering;
            search?: Parameters.Search;
            status?: Parameters.Status;
            wijk?: Parameters.Wijk;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CaseAdvisor[];
        }
    }
    namespace CasesCreate {
        export type RequestBody = Components.Schemas.CaseCreate;
        namespace Responses {
            export type $201 = Components.Schemas.CaseCreate;
        }
    }
    namespace CasesDocumentsCreate {
        export type RequestBody = Components.Schemas.CaseDocument;
        namespace Responses {
            export type $200 = Components.Schemas.CaseDocument;
        }
    }
    namespace CasesDocumentsDestroy {
        namespace Parameters {
            export type DocId = string;
            export type Id = number;
        }
        export interface PathParameters {
            doc_id: Parameters.DocId;
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace CasesDocumentsDownloadRetrieve {
        namespace Parameters {
            export type DocId = string;
            export type Id = number;
        }
        export interface PathParameters {
            doc_id: Parameters.DocId;
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Case;
        }
    }
    namespace CasesDocumentsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CaseDocument;
        }
    }
    namespace CasesDocumentsUpdateNamePartialUpdate {
        namespace Parameters {
            export type DocId = string;
            export type Id = number;
        }
        export interface PathParameters {
            doc_id: Parameters.DocId;
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.PatchedCaseDocumentNameUpdate;
        namespace Responses {
            export type $200 = Components.Schemas.CaseDocumentNameUpdate;
        }
    }
    namespace CasesEventsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CaseEvent;
        }
    }
    namespace CasesLegacyRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CaseList;
        }
    }
    namespace CasesList {
        namespace Parameters {
            export type AdviceType = "Cursus" | "Energieadvies" | "Haalbaarheidsonderzoek";
            export type Advisor = number[];
            export type ApplicationType = "Activatieteam" | "Advies";
            export type Closed = boolean;
            export type CreatedRangeAfter = string; // date
            export type CreatedRangeBefore = string; // date
            export type District = string[];
            export type EndDateRangeAfter = string; // date
            export type EndDateRangeBefore = string; // date
            export type IsSmallHoa = boolean;
            export type Neighborhood = string[];
            export type Ordering = string;
            export type Page = number;
            export type PageSize = number;
            export type Search = string;
            export type Status = string[];
            export type Wijk = string[];
        }
        export interface QueryParameters {
            advice_type?: Parameters.AdviceType;
            advisor?: Parameters.Advisor;
            application_type?: Parameters.ApplicationType;
            closed?: Parameters.Closed;
            created_range_after?: Parameters.CreatedRangeAfter /* date */;
            created_range_before?: Parameters.CreatedRangeBefore /* date */;
            district?: Parameters.District;
            end_date_range_after?: Parameters.EndDateRangeAfter /* date */;
            end_date_range_before?: Parameters.EndDateRangeBefore /* date */;
            is_small_hoa?: Parameters.IsSmallHoa;
            neighborhood?: Parameters.Neighborhood;
            ordering?: Parameters.Ordering;
            page?: Parameters.Page;
            page_size?: Parameters.PageSize;
            search?: Parameters.Search;
            status?: Parameters.Status;
            wijk?: Parameters.Wijk;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseListList;
        }
    }
    namespace CasesProcessesList {
        namespace Parameters {
            export type AdviceType = "Cursus" | "Energieadvies" | "Haalbaarheidsonderzoek";
            export type Advisor = number[];
            export type ApplicationType = "Activatieteam" | "Advies";
            export type Closed = boolean;
            export type CreatedRangeAfter = string; // date
            export type CreatedRangeBefore = string; // date
            export type District = string[];
            export type EndDateRangeAfter = string; // date
            export type EndDateRangeBefore = string; // date
            export type Id = number;
            export type IsSmallHoa = boolean;
            export type Neighborhood = string[];
            export type Ordering = string;
            export type Search = string;
            export type Status = number[];
            export type Wijk = string[];
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            advice_type?: Parameters.AdviceType;
            advisor?: Parameters.Advisor;
            application_type?: Parameters.ApplicationType;
            closed?: Parameters.Closed;
            created_range_after?: Parameters.CreatedRangeAfter /* date */;
            created_range_before?: Parameters.CreatedRangeBefore /* date */;
            district?: Parameters.District;
            end_date_range_after?: Parameters.EndDateRangeAfter /* date */;
            end_date_range_before?: Parameters.EndDateRangeBefore /* date */;
            is_small_hoa?: Parameters.IsSmallHoa;
            neighborhood?: Parameters.Neighborhood;
            ordering?: Parameters.Ordering;
            search?: Parameters.Search;
            status?: Parameters.Status;
            wijk?: Parameters.Wijk;
        }
        namespace Responses {
            export type $200 = Components.Schemas.WorkflowOption[];
        }
    }
    namespace CasesProcessesStartCreate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Case;
        namespace Responses {
            export type $200 = Components.Schemas.StartWorkflow;
        }
    }
    namespace CasesRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Case;
        }
    }
    namespace CasesWorkflowsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Case;
        }
    }
    namespace DistrictsList {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedDistrictList;
        }
    }
    namespace DistrictsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.District;
        }
    }
    namespace GenericTasksCompleteCreate {
        export type RequestBody = Components.Schemas.GenericCompletedTaskCreate;
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace GenericTasksCompleteFileTaskCreate {
        export type RequestBody = Components.Schemas.CaseDocumentWithTask;
        namespace Responses {
            export type $200 = Components.Schemas.CaseDocumentWithTask;
        }
    }
    namespace HomeownerAssociationApartmentsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Apartment;
        }
    }
    namespace HomeownerAssociationCasesRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CaseList;
        }
    }
    namespace HomeownerAssociationContactsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.HomeownerAssociation;
        }
    }
    namespace HomeownerAssociationContactsUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.HomeownerAssociation;
        namespace Responses {
            export type $200 = Components.Schemas.HomeownerAssociation;
        }
    }
    namespace HomeownerAssociationDeleteContactDestroy {
        namespace Parameters {
            export type ContactId = string;
            export type Id = number;
        }
        export interface PathParameters {
            contact_id: Parameters.ContactId;
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace HomeownerAssociationList {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedHomeownerAssociationList;
        }
    }
    namespace HomeownerAssociationPriorityZipcodeCreate {
        export type RequestBody = Components.Schemas.HomeownerAssociation;
        namespace Responses {
            export type $200 = Components.Schemas.HomeownerAssociation;
        }
    }
    namespace HomeownerAssociationRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.HomeownerAssociation;
        }
    }
    namespace HomeownerAssociationSearchRetrieve {
        namespace Responses {
            export type $200 = Components.Schemas.HomeownerAssociation;
        }
    }
    namespace NeighborhoodsList {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedNeighborhoodList;
        }
    }
    namespace NeighborhoodsRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Neighborhood;
        }
    }
    namespace TasksList {
        namespace Parameters {
            export type AdviceType = "Cursus" | "Energieadvies" | "Haalbaarheidsonderzoek";
            export type Advisor = string[];
            export type ApplicationType = "Activatieteam" | "Advies";
            export type CreatedRangeAfter = string; // date
            export type CreatedRangeBefore = string; // date
            export type District = string[];
            export type IsSmallHoa = boolean;
            export type Name = string;
            export type Neighborhood = string[];
            export type Ordering = string;
            export type Page = number;
            export type PageSize = number;
            export type Search = string;
            export type Status = string[];
            export type Wijk = string[];
        }
        export interface QueryParameters {
            advice_type?: Parameters.AdviceType;
            advisor?: Parameters.Advisor;
            application_type?: Parameters.ApplicationType;
            created_range_after?: Parameters.CreatedRangeAfter /* date */;
            created_range_before?: Parameters.CreatedRangeBefore /* date */;
            district?: Parameters.District;
            is_small_hoa?: Parameters.IsSmallHoa;
            name?: Parameters.Name;
            neighborhood?: Parameters.Neighborhood;
            ordering?: Parameters.Ordering;
            page?: Parameters.Page;
            page_size?: Parameters.PageSize;
            search?: Parameters.Search;
            status?: Parameters.Status;
            wijk?: Parameters.Wijk;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedCaseUserTaskListList;
        }
    }
    namespace TasksNamesRetrieve {
        namespace Responses {
            export type $200 = Components.Schemas.CaseUserTaskList;
        }
    }
    namespace TasksRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CaseUserTaskList;
        }
    }
    namespace WijkenList {
        namespace Parameters {
            export type Limit = number;
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedWijkList;
        }
    }
    namespace WijkenRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Wijk;
        }
    }
}
